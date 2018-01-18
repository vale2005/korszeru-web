"use strict"

const request = require('supertest-as-promised');
const api = require('../api');
const Album = require("../album");
const { expect } = require('chai');

describe("HTTP API", function(){

    beforeEach(async function(){
        await request(api).delete("/albums");
    });

    describe("GET", function(){
        it("responds with status 200", async function(){
            const response = await request(api).get("/albums");
            expect(response.status).to.eql(200);
        });

        it('responds with empty json body', async function() {
            const response = await request(api).get('/albums');
            expect(response.type).to.eql('application/json');
            expect(response.body).to.eql([]);
          });
    });

    describe("POST", function(){
        it("creates a new album", async function(){
            const album = new Album();
            album.addSong("one", 700);
            album.addSong("two", 700);
            album.addSong("three", 700);
            album.addSong("four", 700);
            const response = await request(api).post("/albums").send(album);
            expect(response.status).to.eql(201);
            expect(response.body.songs[0].title).to.eql("one");
            expect(response.body).to.include.key("id");
        });
    });


    describe("DELTE", function(){
        it("it deletes all albums", async function(){
            const album = new Album();
            const firstCreated = await request(api).post("/albums").send(album);
            const secondCreated = await request(api).post("/albums").send(album);
            
            await request(api).delete("/albums");

            const response = await request(api).get('/albums');
            expect(response.body).to.eql([]);
        })
    })

    describe("DELETE /:id", function(){
        it("deletes the album with the given id", async function(){
            const album = new Album();
            album.addSong("one", 700);
            album.addSong("two", 700);
            album.addSong("three", 700);
            album.addSong("four", 700);
            const firstAlbum = await request(api).post("/albums").send(album);
            const secondAlbum = await request(api).post("/albums").send(album);
            const response = await request(api).delete("/albums/0");
            expect(response.status).to.eql(204);
            
            const albums = await request(api).get('/albums');
            expect(albums.body[0].id).to.eql(1);
        });
    });

    describe("GET /:id", function(){
        it("returns the album with the given id", async function(){
            const album = new Album();
            album.addSong("one", 700);
            album.addSong("two", 700);
            album.addSong("three", 700);
            album.addSong("four", 700);
            const firstAlbum = await request(api).post("/albums").send(album);
            const response = await request(api).get("/albums/0");
            expect(response.status).to.eql(200);
            expect(response.body.songs[1].title).to.eql("two");
        });

        describe("get n best by given id", function(){
            it("returns the best n song", async function(){
                const album = new Album();
                album.addSong("one", 700);
                album.addSong("two", 700);
                album.addSong("three", 700);
                album.addSong("four", 700);
                const firstAlbum = await request(api).post("/albums").send(album);
                const response = await request(api).get("/albums/0/best/2");
                expect(response.status).to.eql(200);
                expect(response.body.bestSongs.length).to.eql(2);
                expect(response.body.bestSongs[0]).to.eql("four");
                expect(response.body.bestSongs[1]).to.eql("three");
            });
        });
    });
});