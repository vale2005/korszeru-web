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
    describe("given songs with the same frequencies", function(){
        it("it returns them in reverse order", function(){
            const album = new Album();
            
            album.addSong(70, "one");
            album.addSong(70, "two");
            album.addSong(70, "three");
    
            const finder = new BestSongsFinder(album);
            const result = finder.getBestSongs();
            
            expect(result[0]).to.eql("three");
            expect(result[1]).to.eql("two");
            expect(result[2]).to.eql("one")
        })
    })

    describe("order best songs", function(){
        it("it returns the songnames ordered", function(){
            const album = new Album();
            
            album.addSong(30, "one");
            album.addSong(20, "two");
            album.addSong(10, "three");
    
            const finder = new BestSongsFinder(album);
            const result = finder.getBestSongs();
            
            expect(result[0]).to.eql("two");
            expect(result[1]).to.eql("three");
            expect(result[2]).to.eql("one")
        })
    })
})