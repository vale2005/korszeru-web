'use strict';

const BestSongsFinder= require('../best-songs-finder');
const Album = require('../album');
const { expect } = require('chai');

const{
    emptyAlbum,
    albumWithEqualFrequencies,
    realAlbum
} = require("./album-consts");


describe("Best songs finder", function() {
    describe("given songs with the same frequencies", function(){
        it("returns them in reverse order", function(){
    
            const finder = new BestSongsFinder(albumWithEqualFrequencies);
            const result = finder.getBestSongs();
            
            expect(result).to.eql([{title:"four"}, {title:"three"}, {title: "two"},{title: "one"}]);
        });
    });

    describe("order best songs", function(){
        it("returns the songnames ordered", function(){
    
            const finder = new BestSongsFinder(realAlbum);
            const result = finder.getBestSongs();
            
            expect(result[0]).to.eql({title: "19_2000"});
            expect(result[1]).to.eql({title: "clint_eastwood"});
        });
    });

    describe("get the 2 best songs", function(){
        it("returns 2 best songs in order", function(){
            const album = new Album();
    
            const finder = new BestSongsFinder(albumWithEqualFrequencies, 2);
            const result = finder.getBestSongs();
            
            expect(result).to.eql([{title:"four"},{title: "three"}]);
        });
    });
});