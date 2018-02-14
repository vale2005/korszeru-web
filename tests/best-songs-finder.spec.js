'use strict';

const BestSongsFinder= require('../best-songs-finder');
const Album = require('../album');
const { expect } = require('chai');


describe("Best songs finder", function() {
    const emptyAlbum = [];
    
        const albumWithEqualFrequencies = [
            { frequency: 30, title: "one" },
            { frequency: 30, title: "two" },
            { frequency: 30, title: "three" }, 
            { frequency: 30, title: "four" },
        ];
    
        const realAlbum =  [
            { frequency: 30, title: "re_hash" },
            { frequency: 20, title: "5_4" },
            { frequency: 9, title: "tomorrow_comes_today" }
        ];

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
            
            expect(result).to.eql([{title: "5_4"}, {title: "re_hash"}, {title: "tomorrow_comes_today"}]);
        });
    });

    describe("get the 2 best songs", function(){
        it("returns 2 best songs in order", function(){
            const album = new Album();
    
            const finder = new BestSongsFinder(albumWithEqualFrequencies, 2);
            const result = finder.getBestSongs();
            
            expect(result.length).to.eql(2);
            expect(result).to.eql([{title:"four"},{title: "three"}]);
        });
    });
});