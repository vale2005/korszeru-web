'use strict';

var BestSongsFinder= require('../best-songs-finder');
var Album = require('../album');
const { expect } = require('chai');


describe("Best songs finder", function() {
    describe("given songs with the same frequencies", function(){
        it("returns them in reverse order", function(){
            const album = new Album();
            
            album.addSong("one", 70,);
            album.addSong("two", 70);
            album.addSong("three", 70);
    
            const finder = new BestSongsFinder(album);
            const result = finder.getBestSongs();
            
            expect(result).to.eql(["three", "two", "one"]);
        });
    });

    describe("order best songs", function(){
        it("returns the songnames ordered", function(){
            const album = new Album();
            
            album.addSong("one", 30);
            album.addSong("two",20);
            album.addSong("three", 10);
    
            const finder = new BestSongsFinder(album);
            const result = finder.getBestSongs();
            
            expect(result).to.eql(["two", "three", "one"]);
        });
    });

    describe("get the 2 best songs", function(){
        it("returns 2 best songs in order", function(){
            const album = new Album();
            
            album.addSong("one", 70);
            album.addSong("two",70);
            album.addSong("three", 70);
    
            const finder = new BestSongsFinder(album, 2);
            const result = finder.getBestSongs();
            
            expect(result.length).to.eql(2);
            expect(result).to.eql(["three", "two"]);
        });
    });
});