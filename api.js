"use strict"

const BestSongsFinder = require("./best-songs-finder");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const { Store, StoreValidationError, StoreFindError} = require('./store');
const store = new Store();

app.get("/albums", async function(req, res){
    res.status(200).send(await store.getAll()).end();
});

app.post("/albums", async function(req, res){
    try{
        const createdSong = await store.create(req.body)
        res.status(201).send(createdSong).end();
    }
    catch(error){
        const errorStatus = returnStatusCodeForError(error);
        res.status(errorStatus).end();
    }
});

app.get("/albums/:id", async function(req, res){
    try{
        const albumId = req.params.id;
        res.status(200).send(await store.getById(albumId)).end();
    }
    catch(error){
        const errorStatus = returnStatusCodeForError(error);
        res.status(errorStatus).end();
    }
});

app.delete('/albums', async function(req, res) {
    await store.deleteAll();
    res.end();
});

app.delete('/albums/:id', async function(req, res) {
    try{
        const albumId = req.params.id;
        await store.deleteById(albumId);
        res.status(204).end();
    }
    catch(error){
        const errorStatus = returnStatusCodeForError(error);
        res.status(errorStatus).end();
    }
    
});

app.get("/albums/:id/best", async function(req, res){
    try{
        const album = await store.getById(req.params.id);
        if(typeof req.query.top != 'undefined'){
            const finder = new BestSongsFinder(album, req.query.top);
            const bestSongs = finder.getBestSongs();
            res.status(200).send(bestSongs).end();
        }
        else{
            res.status(400).end();
        }
    }
    catch(error){
        const errorStatus = returnStatusCodeForError(error);
        res.status(errorStatus).end();
    }
    
});

function returnStatusCodeForError(error){
    if(error instanceof StoreFindError){
        return 400;
    }
    else if(error instanceof StoreValidationError){
        return 400;
    }
    else{
        return 500;
    }
}

app.listen(3000);

module.exports = app;