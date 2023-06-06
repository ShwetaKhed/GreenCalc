# Image Search by Tags

This fucntions facilitate searching for images based on specific tags. Users can make a query request for image URLs that contain certain tags and a minimum count for each tag. The request triggers an AWS Lambda function that fetches relevant URLs from the database.

## How It Works

1. **API Gateway:** We have established an API Gateway with a RESTful API. This allows users to submit GET or POST requests containing their desired tags and counts.

2. **GET Request:** A GET request might include specific parameters in the URL, such as: `https://jyufwbyv8.execute-api.us-east-1.amazonaws.com/dev/search?tag1=cat&tag1count=1&tag2=car&tag2count=1`. 

3. **POST Request:** Alternatively, users can send a POST request with a JSON object comprising a list of tags and their respective counts. For example:

```json
{
  "tags": [
    {
      "tag": "person",
      "count": 1
    },
    {
      "tag": "desk",
      "count": 2
    }
    ...
  ]
}
```

4. **Lambda Function:** Upon receiving a query, the system triggers a Lambda function. This function takes the list of tags and retrieves S3 URLs of images containing all tags, with at least the specified count, from the database. It performs a logical AND operation between tags, not OR.

5. **Response:** The response is a JSON message containing a list of URLs to all images that match the query. For example:

```json
{
  "links": [
    "https://cloudsnap.s3.amazonaws.com/image1.png",
    "https://cloudsnap.s3.amazonaws.com/image59.png",
    "https://cloudsnap.s3.amazonaws.com/image180.png"
  ]
}
```

6. **UI Display:** In the UI, instead of displaying S3 URLs, the images themselves are previewed as results.

## Usage

To use this service, you need to send a GET or POST request containing your desired tags and counts. The system will then return a list of URLs for images that match your query.
We have 2 different lambda functions. 1 for searching using a single tag and  this used GET request call. The other is the searching using multiple tags and this used a post request.

## Default Behaviour

If a count is not specified for a tag, it defaults to 1. That is, the system assumes you're looking for images where the tag appears at least once.

