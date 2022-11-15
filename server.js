const express = require('express');
const app = express();
var path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const transactionRoutes = express.Router();
require('dotenv').config();
const PORT = 4000;

let Transaction = require('./transaction.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

transactionRoutes.route('/')
.get(function(req, res, next) {
    Transaction.find()
    .then(transactions => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(transactions)
    })
    .catch(err => next(err));
})
.post(function(req, res, next) {
    let transaction = new Transaction(
        {"transaction_label": req.body['transaction-label'],
        "transaction_value": req.body['transaction-value'],
        "transaction_type": req.body['transaction-type']
    });
    transaction.save()
    .then(() => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end('Transaction Created');
    })
    .catch(err => next(err));
})
.delete(function(req, res, next) {
    Transaction.deleteMany({})
    .then(() => {
        res.status(200).send('Data Deleted');
    })
    .catch(err => next(err));
});

transactionRoutes.route('/:id')
.put(function(req, res, next) {
    let transaction = 
        {"transaction_label": req.body['transaction-label'],
        "transaction_value": req.body['transaction-value'],
        "transaction_type": req.body['transaction-type']
    };
    //Find the existing document by the id and replaces it with the details in the transaction variable.
    Transaction.findByIdAndUpdate(req.params.id, { 
        $set: transaction
    }, { new: true }) //Third argument is to get back information about the updated document as a result from this method. 
    .then(transaction => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(transaction);
    })
    .catch(err => next(err));
})
.delete(function(req, res, next) {
    Transaction.findByIdAndDelete(req.params.id)
    .then(response => {
            res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

app.use('/tracker', transactionRoutes);

// Serve the front end:
app.use(express.static(path.join(__dirname, "./client/build"))); 

app.get("*", function (_, res) { 
    res.sendFile( path.join(__dirname, "./client/build/index.html"), 
        function (err) { res.status(500).send(err); 
        } 
    ); 
});


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});