'use strict';

const ZipfGenerator = require("./zipf-generator");

class BestSongsFinder{
    constructor(album){
        this.album = album;
        this._getQualityIndices();
    }

    getBestSongs(){
        const songsWithQualityIndices = this._zipQualityIndicesWithSongs();
        const sorted = songsWithQualityIndices.sort((s1,s2) =>s2.qualityIndex - s1.qualityIndex);
        return sorted.map(song => song.title);
    }

    _getQualityIndices(){
        const frequencies = this.album.songs.map(song => song.frequency);
        const gen = new ZipfGenerator(frequencies);
        this.qualityIndices = gen.calculateQualityIndices();
    }

    _zipQualityIndicesWithSongs(){
        return this.album.songs.map((song, ind) => this._addQualityIndiceToSong(song, ind));
    }

    _addQualityIndiceToSong(song, ind){
         return Object.assign({"qualityIndex": this.qualityIndices[ind]},song);
    }
}

class Album{
    constructor(){
        this.songs = [];
    }

    addSong(frequency, title){
        const songToAdd = {frequency: frequency, title: title};
        this.songs.push(songToAdd);
    }
}

module.exports = {BestSongsFinder, Album};