"use strict"

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const { Store } = require('./store');
const store = new Store();

app.get("/albums", async function(req, res){
    res.status(200).send(await store.getAll()).end();
})

app.post("/albums", async function(req, res){
    res.status(201).send(await store.create(req.body)).end();
})

module.exports = app;