"use strict"

const { Store } = require("../store");
const Album = require("../album")
const { expect } = require("chai");

describe("Albums store", function(){
    it("is empty when created", async function(){
        const store = new Store();
        const albums = await store.getAll();
        expect(albums.length).to.eql(0);
    })

    describe("adding an album", function(){
        it("returns the created album with an ID", async function(){
            const store = new Store();
            var album = new Album();
            album.addSong("one", 2000);
            album.addSong("two", 4000);
            const result = await store.create(album);
            expect(result.songs.length).to.eql(2);
            expect(result.songs[1].title).to.eql("two");
            expect(result).to.include.keys("id"); 

        })
    })
});