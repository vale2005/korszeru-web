"use strict"

const request = require('supertest-as-promised');
const api = require('../api');
const Album = require("../album");
const { expect } = require('chai');

describe("HTTP API", function(){
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

    describe("GET /:id", function(){
        it("returns the album with the given id", async function(){
          const response = await request(api).get("/albums/0");
          expect(response.status).to.eql(200);
          expect(response.body.songs[3].title).to.eql("four");
        });

        describe("get n best by given id", function(){
            it("returns the best n song", async function(){
                const response = await request(api).get("/albums/0/best/2");
                expect(response.status).to.eql(200);
                console.log(response.body);
                expect(response.body.bestSongs.length).to.eql(2);
                expect(response.body.bestSongs[0]).to.eql("four");
                expect(response.body.bestSongs[1]).to.eql("three");
            });
        });
    });
});