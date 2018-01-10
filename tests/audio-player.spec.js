'use strict';

var { BestSongsFinder, Album } = require('../best-songs-finder');
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


describe("Best songs finder", function() {

    // it("is empty when created", function(){
    //     const finder = new BestSongsFinder();
    // })

    describe("adding albums", function(){
        it("returns and id for the added album", function(){
            const album = new Album();
            
            album.addSong(30, "one");
            album.addSong(30, "two");
            album.addSong(15, "three");
            album.addSong(25, "four");
    
            const finder = new BestSongsFinder(album, 1);
            var firstSong = finder.find();
            
            expect(firstSong.title).to.eql("one");
        })
    })
})