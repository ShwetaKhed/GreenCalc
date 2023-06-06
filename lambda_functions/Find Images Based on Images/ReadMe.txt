# Image Search by Image Tags

This function enables users to search for images based on the tags present in a provided image. Users can send an image as part of an API call, upon which the system identifies all objects (tags) in the sent image and their counts. It then finds all the images in CloudSnap storage containing those sets of tags with at least the count numbers. As a response, the list of URLs to matching images are returned to the user.

## How It Works

1. **API Call with Image:** Users can send an image as part of an API call. The system then identifies all objects (tags) in the sent image and their counts.

2. **Image Processing:** The system will then search the CloudSnap storage for images that contain the same set of tags (and at least the count numbers) as those identified in the sent image.

3. **Lambda Function:** This process may require triggering a Lambda function that reads the image tags and retrieves S3 URLs of images containing those tags from the database.

4. **Response:** The response is a JSON message that includes a list of URLs to all matching images. For example:

```json
{
  "links": [
    "https://cloudsnap.s3.amazonaws.com/image1.png",
    "https://cloudsnap.s3.amazonaws.com/image59.png",
    "https://cloudsnap.s3.amazonaws.com/image180.png"
  ]
}
```

5. **UI Display:** In the UI, instead of displaying S3 URLs, the images themselves are previewed as results.

## Important Note

When users upload an image for the purpose of a query, the system ensures that this image is not added to the database or stored in S3. The image is purely used for the purpose of identifying tags and performing the image search.

## Usage

To use this service, you need to send an API call with the image you want to use for the search. The system will then return a list of URLs for images that contain the same tags as your image.

## Permissions

Please ensure that the AWS Lambda function has the necessary permissions to read from your AWS database, execute your queries, and access images from your S3 storage.