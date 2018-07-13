# pirple

## Homework Assignment #1

### Description:

- A RESTful API capable of two environments and listening on two ports 3000 (staging) and 5000 (production)
- The API will receive a POST request directed at the route "/hello" and return a code 200
- On a succesful request a welcome message is returned in JSON format "{'Message':'Hello world!'}"
- Other routes will return an error 404
- Any other method than POST returns an error 500 and a messege in JSON format "{'Error':'Method not allowed'}"
- Config file is placed in a config directory
- Handlers file is placed in a lib directory

