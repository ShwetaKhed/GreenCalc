import json
import psycopg2
import boto3


def lambda_handler(event, context):
    # Parse tags and counts from GET request
    tag1 = event['queryStringParameters']['tag1'].lower()
    tag1count = int(event['queryStringParameters'].get('tag2', 1))  # tag2 is count for tag1

    print(f"Searching for tags: {tag1} (count: {tag1count})")

    s3_client = boto3.client('s3')
    connection = psycopg2.connect(
        host="my-db-instance.cy9ecey6190a.us-east-1.rds.amazonaws.com",
        database="initial_db",
        user="postgres",
        password="database123"
    )
    cursor = connection.cursor()

    cursor.execute("SELECT url, objects FROM images")
    data = cursor.fetchall()

    print(f"Fetched data from database: {data}")

    dict1 = {url: [tag.lower() for tag in json.loads(tags)] for url, tags in data}

    lst = [url for url, tags in dict1.items() if tags.count(tag1) >= tag1count]

    print(f"URLs matching tags: {lst}")

    signed_url_list = []
    for i in lst:
        element = i.split("/")
        image = element[-1]
        url = s3_client.generate_presigned_url(ClientMethod='get_object',
                                               Params={'Bucket': 'imageupload1', 'Key': image}, ExpiresIn=600)
        signed_url_list.append(url)

    print(f"Generated signed URLs: {signed_url_list}")

    return {
        'statusCode': 200,
        'body': json.dumps(signed_url_list),
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods": "OPTIONS,POST,PUT,DELETE",
            "Access-Control-Allow-Origin": "*",
            "X-Requested-With": "*"
        }
    }
