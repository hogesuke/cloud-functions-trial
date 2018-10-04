const express = require('express');
const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// expressを使用した場合
const app = express();

app.get('/:id', (req, res) => res.send('Hello!!!'));

exports.trial = functions.https.onRequest(app);