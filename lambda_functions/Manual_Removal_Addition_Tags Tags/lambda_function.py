import json
import psycopg2
from collections import Counter

def create_connection():
    connection = psycopg2.connect(
        host="my-db-instance.cy9ecey6190a.us-east-1.rds.amazonaws.com",
        database="initial_db",
        user="postgres",
        password="database123"
    )
    return connection

def lambda_handler(event, context):
    tags = json.loads(event["body"])
    connection = create_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT objects FROM images WHERE url = %s", (tags["url"],))
    data = cursor.fetchone()

    if data is None:
        return {
            'statusCode': 400,
            'body': json.dumps("URL not found in the database.")
        }

    # Load the tags from the database as JSON
    current_tags = json.loads(data[0])
    tag_counter = Counter(current_tags)

    if (tags['type'] == '1'):  # Add tags
        for tag_to_add in tags['tags']:
            tag_counter[tag_to_add["tag"]] += tag_to_add.get("count", 1)
        output = "Tag/s are added!!!!!. " + "Updated tags are: " + str(dict(tag_counter))

    elif (tags['type'] == '0'):  # Remove tags
        for tag_to_remove in tags['tags']:
            tag_counter[tag_to_remove["tag"]] -= min(tag_counter[tag_to_remove["tag"]], tag_to_remove.get("count", 1))
            if tag_counter[tag_to_remove["tag"]] <= 0:
                del tag_counter[tag_to_remove["tag"]]
        output = "Tag/s are deleted!!!!!. " + "Updated tags are: " + str(dict(tag_counter))
    else:
        output = "Invalid type."
        
    updated_tags = list(tag_counter.elements())

    # Dump the updated tags to a JSON string
    cursor.execute(
        "UPDATE images SET objects = %s WHERE url = %s",
        (json.dumps(updated_tags), tags["url"])
    )
    connection.commit()
    connection.close()

    return {
        'statusCode': 200,
        'body': json.dumps(output)
    }
