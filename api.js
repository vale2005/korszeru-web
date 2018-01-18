"use strict"

const BestSongsFinder = require("./best-songs-finder");

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

app.get("/albums/:id/best", async function(req, res){
    const album = await store.getById(req.params.id);
    const finder = new BestSongsFinder(album, req.query.top);
    const bestSongs = finder.getBestSongs();
    
    res.status(200).send(bestSongs).end();
});

module.exports = app;