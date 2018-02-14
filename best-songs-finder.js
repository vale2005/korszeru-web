'use strict';

const ZipfGenerator = require("./zipf-generator");

class BestSongsFinder{
    constructor(album, count){
        this.album = album;
        this.count = count;
        this._getQualityIndices();
    }

    getBestSongs(){
        const songsWithQualityIndices = this._zipQualityIndicesWithSongs();
        const sorted = songsWithQualityIndices.sort((s1,s2) => s2.qualityIndex - s1.qualityIndex);
        const sortedTitles = sorted.map(song => ({title: song.title}));
        
        if(this.count != undefined) return sortedTitles.slice(0, this.count);
        else return sortedTitles;
    }

    _getQualityIndices(){
        const frequencies = this.album.map(song => song.frequency);
        const gen = new ZipfGenerator(frequencies);
        this.qualityIndices = gen.calculateQualityIndices();
    }

    _zipQualityIndicesWithSongs(){
        return this.album.map((song, ind) => this._addQualityIndiceToSong(song, ind));
    }

    _addQualityIndiceToSong(song, ind){
         return Object.assign({"qualityIndex": this.qualityIndices[ind]},song);
    }
}

module.exports = BestSongsFinder;