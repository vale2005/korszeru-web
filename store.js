"use strict"

const BestSongsFinder = require("./best-songs-finder");

class Store{
    constructor(){
        this._albums = [];
    }

    async getAll(){
        return this._albums;
    }

    async create(album){
        const toCreate = {...album, id: this._albums.length};
        this._albums.push(toCreate);
        return toCreate;
    }

    async getById(id){
        return this._albums.find(album => album.id == id);
    }

    async getBest(id, count){
        const album = await this.getById(id);
        const finder = new BestSongsFinder(album, count);

        return finder.getBestSongs();
    }
}

module.exports = {Store};