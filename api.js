"use strict"

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const { Store } = require('./store');
const store = new Store();

app.get("/albums", async function(req, res){
    res.status(200).send(await store.getAll()).end();
});

app.post("/albums", async function(req, res){
    res.status(201).send(await store.create(req.body)).end();
});

app.get("/albums/:id", async function(req, res){
    const albumId = req.params.id;
    res.status(200).send(await store.getById(albumId)).end();
});

app.delete('/albums', async function(req, res) {
    await store.deleteAll();
    res.end();
});

app.delete('/albums/:id', async function(req, res) {
    const albumId = req.params.id;
    await store.deleteById(albumId);
    res.status(204).end();
});

app.get("/albums/:id/best/:top", async function(req, res){
    const albumId = req.params.id;
    const songCount = req.params.top
    const bestSongs = await store.getBest(albumId, songCount)
    res.status(200).send({'bestSongs': bestSongs}).end();
});

module.exports = app;