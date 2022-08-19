const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const transactionRoutes = express.Router();
const PORT = 4000;

let Transaction = require('./transaction.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/tracker', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

transactionRoutes.route('/').get(function(req, res) {
    Transaction.find(function(err, transactions) {
        if (err) {
            console.log(err);
        } else {
            res.json(transactions);
        }
    });
})
.post(function(req, res) {
    console.log('this is req.body');
    console.log(req.body);
    let transaction = new Transaction(
        {"transaction_label": req.body['transaction-label'],
        "transaction_value": req.body['transaction-value'],
        "id": req.body.id
    });
    transaction.save()
        .then(transaction => {
            res.status(200).json({'transaction': 'transaction added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new transaction failed');
        });
});

app.use('/tracker', transactionRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});