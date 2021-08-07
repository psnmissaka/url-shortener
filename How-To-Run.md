This is a URL shortener service built in Node.JS. The API exposes two endpoints which will encode URL to a short URL and another
which returns the original URL when short URL is sent.

The application is dockerized to easily run.

## How to build the image

Image can be built by running the following command
`docker build . -t <username>/url-shortener`

## How to run the docker container with the API

`docker run -p 3000:3000 -it <username>/url-shortener`
