# Socket Server

Documentation for the socket server.

### Token Auth and Protocol

For token authentication the secret key is located in the JS Object in `secrets.js`.
**DON'T FORGET TO CHANGE THIS IN PRODUCTION.**

When establishing a WebSocket connection, one must put the token as a token query param. e.g.
```
wss://sasc-help.com/socket?token=<TOKEN_VALUE>
```
The token should be a JWT token with the following payload data and JSON structure:
```json
{
  "type": "COUNSELOR",
  "name": "Joe"
}
```
This will be subject to change after we add in the SMS features.


### Client :: Student

The following events will have listeners after the connection takes place. These are to be sent by the client when they're a student.

#### msg
- **Description:**  This will be the main end point called to when a student sends a message. Simply put the message string as the other emit parameter.
- **Payload:**
```
  "<MSG_STRING>"
```

### Client :: Counselor

The following events will have listeners after the connection takes place. These are to be sent by the client when they're a counselor.

#### msg
- **Description:**  This will be the main end point called to when the counselor sends a message. Simply put the JS Object as the other emit parameter.
- **Payload:**
```
{
  "convoId": "<UUID>",
  "msg": "<MSG_STRING>"
}
```