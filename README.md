# URL Shortener

This is a URL shortener service built in Node.JS. The API exposes two endpoints which will encode URL to a short URL and another
which returns the original URL when short URL is sent.

## Development

The API has been developed with NodeJS and express.

For linting and code formatting [ESlint](https://eslint.org/) and [Prettier](https://prettier.io/) has been used.

For testing [Jest framework](https://jestjs.io/) is used along with supertest for API endpoint testing.

For logging we use [morgan](https://www.npmjs.com/package/morgan) and [winston](https://www.npmjs.com/package/winston).

### for development

When you are in development, you can use `npm run dev`.

### for testing

Run `npm run test` for running the tests.

## Production

The application is dockerized for running in production.
When running in production `NODE_ENV` is set for `production`. We are also
using [PM2](https://pm2.keymetrics.io/) process manager for running the
application in the production environment.

Following section contains how we can build the docker images of the application
and run a container from the image.

### How to build the image

Image can be built by running the following command
`docker build . -t <username>/url-shortener`

### How to run the docker container with the API

`docker run -p 3000:3000 -d <username>/url-shortener`

## How to use the API

The API documentation has been done with Swagger API spec. You can easily test out the API via Swagger UI. Once the API is up and running
you can navigate to `http://localhost:3000/api-docs/` to view the swagger UI.

There are two API endpoint exposed through the API,

-   `/encode` - `POST` for encoding a URL to a short URL
-   `/decode` - `POST` for decoding a short URL to a long URL

For testing out an API endpoint, you can choose the API endpoint dropdown from the swagger UI.

Once you select **Try it out** button under the `/encode` API endpoint, you can view body param object which you can edit.

Please enter a URL of your choice, for the `url` value.

Then press the **Execute** button. This would trigger the API endpoint and return a short URL.

For testing out the `/decode` endpoint, follow the same steps. You can use the short URL you used to
encode from the ealier step.
