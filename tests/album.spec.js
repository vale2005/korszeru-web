'use strict';

const Album = require('../album');
const { expect } = require('chai');

describe("Album", function(){
    describe("adding a song", function(){
        it("has a song in it", function(){
            const album = new Album();
            album.addSong("one", 30);
            expect(album.songs).to.eql([{frequency: 30, title: "one"}]);
        });
    });
});