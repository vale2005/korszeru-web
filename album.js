"use strict"

class Album{
    constructor(){
        this.songs = [];
    }

    addSong(title, frequency){
        const songToAdd = {title: title, frequency: frequency};
        this.songs.push(songToAdd);
    }
}

module.exports = Album