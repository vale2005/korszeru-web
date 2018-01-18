"use strict"

class Store{
    constructor(){
        this._albums = [];
    }

    async getAll(){
        return this._albums;
    }

    async create(songs){
        const toCreate = {id: this._albums.length+1, songs: songs};
        this._albums.push(toCreate);
        return {id: toCreate.id};
    }

    async getById(id){
        const album = this._albums.find(album => album.id == id);
        if(!album){
            throw new StoreFindError("missing album")
        }
        return album.songs;
    }

    async deleteById(id){
        const albumsWithoutDeleted = this._albums.filter(album => album.id != id);
        if(albumsWithoutDeleted.length === this._albums.length){
            throw new StoreFindError("missing album");
        }
        this._albums = albumsWithoutDeleted;
    }

    async deleteAll(){
        this._albums = [];
    }
}

class StoreValidationError extends Error {
    
}
    
class StoreFindError extends Error {

}

module.exports = {Store, StoreValidationError, StoreFindError};