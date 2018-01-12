"use strict"

class Store{
    constructor(){
        this._albums = []
    }

    async getAll(){
        return this._albums;
    }

    async create(album){
        const toCreate = {...album, id: this._albums.length};
        this._albums.push(toCreate);
        return toCreate;
    }
}

module.exports = {Store};