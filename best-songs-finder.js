'use strict';

class BestSongsFinder{
    constructor(album){
        this.album = album;
    }

    find(){
        return this.album.songs[0];
    }
}

class Album{
    constructor(){
        this.songs = [];
    }

    addSong(frequency, title){
        var songToAdd = {frequency: frequency, title: title};
        this.songs.push(songToAdd);
    }
}

module.exports = {BestSongsFinder, Album};