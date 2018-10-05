const express = require('express');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./config.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// expressを使用しない場合
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});

// expressを使用した場合
const app = express();

// app.get('/:id', (req, res) => res.send('Hello!!!'));

app.get('/cities', (req, res) => {
    const db = admin.firestore();
    const citiesRef = db.collection('cities');
    return citiesRef.get()
        .then(querySnapshot => {
            const items = [];
            querySnapshot.forEach(doc => items.push(doc.data()));
            res.set('Content-Type', 'application/json');
            res.status(200).send(items);
            return;
        }).catch(err => {
            res.status(500).send('エラー発生： ' + err);
        });
});

exports.trial = functions.https.onRequest(app);