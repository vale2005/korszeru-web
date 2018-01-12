'use strict';

var Album = require('../album');
const { expect } = require('chai');

describe("Album", function(){
    describe("adding a song", function(){
        it("has a song in it", function(){
            const album = new Album();
            album.addSong(30, "one");
            expect(album.songs.length).to.eql(1);
        })
    })
});