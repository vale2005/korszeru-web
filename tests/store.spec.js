"use strict"

const { Store } = require("../store");
const Album = require("../album")
const { expect } = require("chai");

describe("Albums store", function(){
    it("is empty when created", async function(){
        const store = new Store();
        const albums = await store.getAll();
        expect(albums.length).to.eql(0);
    });

    describe("adding an album", function(){
        it("returns the created album with an ID", async function(){
            const store = new Store();
            const album = new Album();
            album.addSong("one", 2000);
            album.addSong("two", 4000);
            const result = await store.create(album);
            expect(result.songs.length).to.eql(2);
            expect(result.songs[1].title).to.eql("two");
            expect(result).to.include.keys("id"); 

        });
    });

    describe("getting an album by id", function(){
        it("returns the album with the given id", async function(){
            const store = new Store();
            const album = new Album();
            await store.create(album);
            await store.create(album);
            album.addSong("one", 2000);
            await store.create(album);
            const result = await store.getById(2);
            expect(result.songs.length).to.eql(1);
            expect(result.songs[0].title).to.eql("one");
        });
    });

    describe("getting the best songs", function(){
        describe("given 2 as a parameter", function(){
            it("returns the songs with the 2 best quality indices", async function(){
                const store = new Store();
                const album = new Album();
                album.addSong("one", 2000);
                album.addSong("two", 2000);
                album.addSong("three", 2000);
                album.addSong("four", 2000);
                await store.create(album);
                const result = await store.getBest(0, 2);
                expect(result.length).to.eql(2);
                expect(result[0]).to.eql("four");
                expect(result[1]).to.eql("three");
            });
        });
    });
});