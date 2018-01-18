"use strict"

class Album{
    constructor(){
        this.songs = [];
    }

    addSong(title, frequency){
        const songToAdd = {frequency: frequency, title: title};
        this.songs.push(songToAdd);
    }
}

module.exports = Album