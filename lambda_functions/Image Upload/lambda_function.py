
import numpy as np
import cv2
import boto3
import json
import time
import uuid
import psycopg2

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
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        download_path = '/tmp/{}{}'.format(uuid.uuid4(), key)
        s3_client.download_file(image_bucket_name, key, download_path)

    # Decode the image
    image_array = cv2.imread(download_path, cv2.IMREAD_COLOR)

    # Load the YOLO model
    labelsPath = "/var/task/coco.names"
    cfgpath = "/var/task/yolov3-tiny.cfg"
    wpath = "/var/task/yolov3-tiny.weights"

    LABELS = get_labels(labelsPath)
    Weights, CFG = get_weights_weights_config(wpath, cfgpath)

    nets = load_model(CFG, Weights)

    # Perform object detection on the image and get the JSON object
    detected_objects = do_prediction(image_array, nets, LABELS)

    try:
        connection = psycopg2.connect(
            host="my-db-instance.cy9ecey6190a.us-east-1.rds.amazonaws.com",
            database="initial_db",
            user="postgres",
            password="database123"
        )

        cursor = connection.cursor()

        # Assuming your table is named `images` and has the columns `url` (for the S3 URL) and `objects` (for the detected objects)
        s3_url = "https://s3.amazonaws.com/{}/{}".format(bucket, key)
        insert_query = "INSERT INTO images (url, objects) VALUES (%s, %s)"
        cursor.execute(insert_query, (s3_url, json.dumps(detected_objects)))

        connection.commit()
        cursor.close()
        connection.close()

        return {
            'statusCode': 200,
            'body': json.dumps('Image processed and data saved successfully!')
        }

    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps('An error occurred.')
        }
