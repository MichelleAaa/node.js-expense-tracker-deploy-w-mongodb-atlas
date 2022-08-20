Start the server by using nodemon (from the backend file, use the terminal and enter:)

$ nodemon server

Also start the MongoDB server.

In Postman for testing:
POST to - http://localhost:4000/tracker
{"transaction_label": "bill", "transaction_value": -100,
"id": "1"
}
Then GET request to view the new entry.