# Art-Gallery API's README

## Specs
- NodeJs v6.10.0
- HapiJs v16.1.0
- MongoDB 
   * db  v3.4.3
   * node v2.2.24
 
## Getting Started
- run `node lib/server.js`
- run mongo server `mongod`
- open where server is running at (default is port 9999) `:9999/documentation` to view the API interface/documentation.

## Structure

### /lib

```
| Art Gallery
|____ Configuration (contains routes/handlers/payloads)
|____ Repository (contains our classes)
|____ index.js (registers our "Art-Gallery" plugin)
| response.js (Handles our responses)
| server.js (sets up our server)
```
### /mongoTest.js

This file is used to do tests with and will not be in production.

