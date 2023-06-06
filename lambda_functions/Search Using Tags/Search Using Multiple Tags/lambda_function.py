import json
import boto3
import psycopg2
from collections import Counter

s3 = boto3.client('s3')
OBJECT_BUCKET = 'imageupload1'


def create_connection():
    connection = psycopg2.connect(
        host="my-db-instance.cy9ecey6190a.us-east-1.rds.amazonaws.com",
        database="initial_db",
        user="postgres",
        password="database123"
    )
    return connection


def lambda_handler(event, context):
    # Parse the request body as JSON
    request_json = json.loads(event['body'])

    # Get the list of tags from the request
    request_tags = request_json['tags']
    print(request_tags)

    # Create a Counter object to store the tags and their counts
    request_tags_counter = Counter({tag['tag']: tag.get('count', 1) for tag in request_tags})
    print(request_tags_counter)

    # Connect to the database
    connection = create_connection()
    cursor = connection.cursor()

    # Get all the images from the database
    cursor.execute("SELECT * FROM images")
    images = cursor.fetchall()

    urls = []

    # Check each image to see if it has all the tags
    for image in images:
        print(image)
        image_tags = json.loads(image[2])

        image_tags_counter = Counter(image_tags)
        print(image_tags_counter)
        # Check if the image tags contain all the requested tags with the correct counts
        if all(value <= image_tags_counter.get(key, 0) for key, value in request_tags_counter.items()):
            urls.append(image[1])
            print(image[1])

    # Generate presigned urls
    signed_urls = []
    for url in urls:
        s3_key = url.split("/")[-1]
        signed_url = s3.generate_presigned_url('get_object', Params={'Bucket': OBJECT_BUCKET, 'Key': s3_key})
        signed_urls.append(signed_url)

    # Return the signed urls
    return {
        'statusCode': 200,
        'body': json.dumps({'links': urls}),
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods": "OPTIONS,POST,PUT,DELETE",
            "X-Requested-With": "*"
        }
    }
