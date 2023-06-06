
import numpy as np
import cv2
import boto3
import json
import time
import uuid
import psycopg2
import base64
import logging

from botocore.exceptions import NoCredentialsError

# construct the argument parse and parse the arguments
confthres = 0.3
nmsthres = 0.1
bucket_name = 'yolofiles1'  # replace with your S3 bucket name for models
image_bucket_name = 'imageupload1'  # replace with your S3 bucket name for images

s3_client = boto3.client('s3')

def get_labels(labels_path):
    with open(labels_path, 'r') as f:
        LABELS = f.read().strip().split("\n")
    return LABELS

def get_weights_weights_config(weights_path, config_path):
    return weights_path, config_path

def load_model(configpath, weightspath):
    print("[INFO] loading YOLO from disk...")
    net = cv2.dnn.readNetFromDarknet(configpath, weightspath)
    return net

def do_prediction(image, net, LABELS):
    (H, W) = image.shape[:2]
    # determine only the *output* layer names that we need from YOLO
    ln = net.getLayerNames()
    ln = [ln[i - 1] for i in net.getUnconnectedOutLayers()]

    # construct a blob from the input image and then perform a forward
    # pass of the YOLO object detector, giving us our bounding boxes and
    # associated probabilities
    blob = cv2.dnn.blobFromImage(image, 1 / 255.0, (416, 416),
                                 swapRB=True, crop=False)
    net.setInput(blob)
    start = time.time()
    layerOutputs = net.forward(ln)
    # print(layerOutputs)
    end = time.time()

    # show timing information on YOLO
    print("[INFO] YOLO took {:.6f} seconds".format(end - start))

    # initialize our lists of detected bounding boxes, confidences, and
    # class IDs, respectively
    boxes = []
    confidences = []
    classIDs = []

    # loop over each of the layer outputs
    for output in layerOutputs:
        # loop over each of the detections
        for detection in output:
            # extract the class ID and confidence (i.e., probability) of
            # the current object detection
            scores = detection[5:]
            # print(scores)
            classID = np.argmax(scores)
            # print(classID)
            confidence = scores[classID]

            # filter out weak predictions by ensuring the detected
            # probability is greater than the minimum probability
            if confidence > confthres:
                # scale the bounding box coordinates back relative to the
                # size of the image, keeping in mind that YOLO actually
                # returns the center (x, y)-coordinates of the bounding
                # box followed by the boxes' width and height
                box = detection[0:4] * np.array([W, H, W, H])
                (centerX, centerY, width, height) = box.astype("int")

                # use the center (x, y)-coordinates to derive the top and
                # and left corner of the bounding box
                x = int(centerX - (width / 2))
                y = int(centerY - (height / 2))

                # update our list of bounding box coordinates, confidences,
                # and class IDs
                boxes.append([x, y, int(width), int(height)])

                confidences.append(float(confidence))
                classIDs.append(classID)

    # apply non-maxima suppression to suppress weak, overlapping bounding boxes
    idxs = cv2.dnn.NMSBoxes(boxes, confidences, confthres,
                            nmsthres)

    # ensure at least one detection exists
    if len(idxs) > 0:
        objects = []
        # loop over the indexes we are keeping
        for i in idxs.flatten():
            # only consider detected objects with an accuracy over 0.6
            if confidences[i] > 0.6:
                # append only the label of the detected object
                objects.append(LABELS[classIDs[i]])

        return objects  # return the list of detected objects

def lambda_handler(event, context):
    # get the s3 bucket event
    tags = json.loads(event["body"].encode('utf-8'))
    data = tags['contents']

    # Decode the image
    image_bytes = base64.b64decode(data)

    # Convert bytes to numpy array
    np_array = np.frombuffer(image_bytes, np.uint8)

    # Decode the numpy array as an image
    image_array = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

    # Load the YOLO model
    labelsPath = "/var/task/coco.names"
    cfgpath = "/var/task/yolov3-tiny.cfg"
    wpath = "/var/task/yolov3-tiny.weights"

    LABELS = get_labels(labelsPath)
    Weights, CFG = get_weights_weights_config(wpath, cfgpath)

    nets = load_model(CFG, Weights)

    # Perform object detection on the image and get the JSON object
    objects = do_prediction(image_array, nets, LABELS)

    #json response
    final = search_url(objects)
    return {
        'statusCode': 200,
        'body': json.dumps(final),
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods": "OPTIONS,POST,PUT,DELETE",

            "Access-Control-Allow-Origin": "*",
            "X-Requested-With": "*"
        }
    }


def search_url(tag_list):
    logging.info("Search tags: %s", tag_list)

    connection = psycopg2.connect(
        host="my-db-instance.cy9ecey6190a.us-east-1.rds.amazonaws.com",
        database="initial_db",
        user="postgres",
        password="database123"
    )
    cursor = connection.cursor()
    cursor.execute("SELECT url, objects FROM images")
    data = cursor.fetchall()
    logging.info("Database data: %s", data)

    dict1 = {url: json.loads(tags) for url, tags in data}
    logging.info("URL-tags dictionary: %s", dict1)

    lst = [url for url, tags in dict1.items() if set(tag_list) == set(tags)]
    logging.info("Matching URLs: %s", lst)

    signed_url_list = []
    for i in lst:
        element = i.split("/")
        image = element[-1]
        url = s3_client.generate_presigned_url(ClientMethod='get_object',
                                               Params={'Bucket': 'imageupload1', 'Key': image}, ExpiresIn=600)
        signed_url_list.append(url)
    logging.info("Signed URLs: %s", signed_url_list)

    return signed_url_list