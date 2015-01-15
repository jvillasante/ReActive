$ NODE_ENV=production node --harmony bin/www
$ wrk -t13 -c400 -d30s -swrk_conf.lua http://localhost:3000/api/v1/users
$ ab -n 5000 -c 100 -A foobar:secret http://localhost:3000/api/v1/users
$ siege -c10 -t10s -H"Accept: application/json" -H"Content-Type: application/json" -H"Authorization: Basic Zm9vYmFyOnNlY3JldA==" http://localhost:3000/api/v1/users
http://localhost:3000/api/v1/projects/db341659-f243-45c4-ad00-80a2c908ff81/templates/43352c35-d2b2-407e-87fa-9a331820450d

Postgres:
=========
  $ sudo apt-get update
  $ sudo apt-get install postgresql postgresql-contrib pgadmin3
  $ sudo -u postgres psql postgres
  $ \password postgres
  * Configure postgres database to add uuid-ossp extension
  $ sudo /etc/init.d/postgresql reload
  $ sudo /etc/init.d/postgresql restart

Node modules:
=============
  $ npm init
  $ npm install --save express body-parser morgan validator async lodash errto custom-err bcrypt
  $ npm install --save pg pg-native 
  $ npm install --save passport passport-http
  $ npm install --save-dev mocha should sinon proxyquire supertest db-migrate

Migrations:
==========
  $ node_modules/.bin/db-migrate create add-users
  $ node_modules/.bin/db-migrate up [-e test/dev/prod]
  $ node_modules/.bin/db-migrate down [-e test/dev/prod]

Errors:
======
  db errors:
  =========
    1001 - db connection error
    1002 - db query error
  validation errors:
  =================
    2001 - validation error
  crypto errors:
  =============
    3001 - hashing error
  unknown errors:
  ==============
    4001 - async error

HTTP methods (verbs):
====================
  * GET: This method is used to retrieve information for the requested resource.
  * HEAD: This method is similar to GET, but should not contain the message body in the response. It is uselfull to
    check the validity, accessibility, and modification of resources.
  * POST: This method sends a new subordinate of the resource to the server. If a new resource has been created, the
    server should respond with the `201 Created` status code; however, if the action did not result in an identifiable
    resource, it should respond with `200 OK` or `204 No Content`.
  * PUT: This method requests that the entity sent is stored at the requested URI. It can be used to update a resource
    or create a new one if the IRI does not point to an existing one.
  * DELETE: This method is used to remove the entity stored at the requested URI; it should respond with `200 OK`,
    `204 No Content`, or `202 Accepted` (which means the deletion has not occurred yet, but it will).
  * PATCH: Similar to `PUT`. This method request that a set of changes described in the request entity be applied to
    the resource identified by the request URI. The set of changes is represented in a format called "patch document"
    identified by a media type. (Example request below).
      PATCH /api/users/john HTTP/1.1
        Host: www.example.com
        Content-Type: application/json-patch+json

        [{
          "op": "replace",
          "path": "/age",
          "value": 32
        }, {
          "op": "replace",
          "path": "/website",
          "value": "johndoe.domain"
        }]

HTTP status codes:
=================
  * 1xx - informational 
  * 2xx - success (The request has been received, understood, and accepted by the server)
    - 200 OK: This status code indicates that the request has succeeded.
    - 201 Created: This status code indicates that the request has succeeded and a new resource has been created.
    - 202 Accepted: This status code does not say anything about the actual result; it only states that the request
      has been accepted and that it is being processed asynchronously.
    - 204 No Content: This status code indicates that the request has succeeded, but it does not include a message body.
  * 3xx - redirection (Send the client somewhere else for the actual resource)
    - 301 Moved Permanently: This status code indicates that the resource has a new permanent URI, provided by the
      `Location` response header.
    - 302 Found: This status code indicates that the resource is temporarily located at another URI, provided by the
      `Location` field.
    - 304 Not Modified: This status code should be used when the client makes a conditional `GET` request but the
      document has not been modified.
  * 4xx - client error (situations related to a client error, server should indicate whether it is a temporary or permanent error)
    - 400 Bad Request: This indicates that the syntax of the request is malformed and could not be understood by the
      server.
    - 401 Unauthorized: This indicates that the client is not authenticated and thus cannot access the resource.
    - 403 Forbidden: This indicates that the client does not have access to the resource, and authorization will not
      help. The server might not want to let the user know that the resource exists at this URI and could respond with
      `404 Not Found` (for example, because of privacy or security reasons).
    - 404 Not Found: This indicates that the server could not find anything at the requested URI.
    - 406 Not Acceptable: The request is not acceptable by the server. Usefull for "content negotiation".
    - 409 Conflict: This indicates that the request was not completed because of a conflict with the current state
      of the resource.
    - 429 Too Many Requests: This indicates that the client has exceeded the imposed rate limit (the client has sent
      too many requests) and they should only retry after a certain period (defined by the `Retry-After` header).
    - 422 Unprocessable Entity: This indicates that the content type is understood and the syntax is not malformed,
      but it was not able to process the request.
  * 5xx - server error (Problem on the server, which can be temporary or permanent)
    - 500 Internal Server Error: This indicates that the server could not fulfill the request due to an unexpected error.
    - 501 Not Implemented: This is used when the server does not recognize the request method.
    - 503 Service Unavailable: This indicates that the server was unable to handle the request at the time due to a
      temporary overload or maintenance.
