import json
import boto3
import psycopg2

s3_client = boto3.client('s3')


def create_connection():
    connection = psycopg2.connect(
        host="my-db-instance.cy9ecey6190a.us-east-1.rds.amazonaws.com",
        database="initial_db",
        user="postgres",
        password="database123"
    )
    return connection


def lambda_handler(event, context):
    url = event['url']
    key = url.split("/")[-1]  # Extract the key from the url

    try:
        s3_client.delete_object(Bucket="imageupload1", Key=key)
        print("Deleted from s3")
        # return {
        #     'statusCode': 200,
        #     'body': 'Object deleted successfully'
        # }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': str(e)
        }

    connection = create_connection()
    cursor = connection.cursor()

    try:

        query = "SELECT * FROM images WHERE url = '" + url + "';"
        message = "Image Deleted Successfully!!!"
        cursor.execute(query);
        data = cursor.fetchone()
        if data is None:
            print("URL not found in the database.")
        else:
            print(f"Data in the database: {data}")

        cursor.execute("DELETE FROM images WHERE url = %s", (url,))
        print(f"Number of rows deleted: {cursor.rowcount}")  # Print the number of affected rows

        if cursor.rowcount == 0:
            print("No rows were deleted. Check if the URL is correct and exists in the database.")
            message = "No Image found"
            
        
        connection.commit()
    except Exception as e:
        print(f"Error occurred: {e}")
    finally:
        connection.close()

    return {
        'statusCode': 200,
         'message' : message,
        'headers': {
            "Content-Type": "image/jpeg",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
            "Access-Control-Allow-Origin": "*",
            "X-Requested-With": "*"
        }
    }


def delete_obj(image_url):
    try:
        s3.delete_object(Bucket=bucket_name, Key=object_key)
        print("done")
        return {
            'statusCode': 200,
            'body': 'Object deleted successfully'
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': str(e)
        }
