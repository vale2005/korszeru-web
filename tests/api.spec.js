"use strict"

const request = require('supertest-as-promised');
const api = require('../api');
const Album = require("../album");
const { expect } = require('chai');

const {
    emptyAlbum, 
    albumWithEqualFrequencies, 
    realAlbum, 
    albumWithTitleMissing, 
    albumWithFrequencyMissing
} = require("./album-consts");

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
            const response = await request(api).post("/albums").send(realAlbum);
            expect(response.status).to.eql(201);
            expect(response.body).to.eql({id: 1});
        });

        it("responds 400 if a song has no title", async function(){
            const response = await request(api).post("/albums").send(albumWithTitleMissing);
            expect(response.status).to.eql(400);
        });
    });


    describe("DELTE", function(){
        it("it deletes all albums", async function(){
            const firstCreated = await request(api).post("/albums").send(emptyAlbum);
            const secondCreated = await request(api).post("/albums").send(emptyAlbum);
            
            await request(api).delete("/albums");

            const response = await request(api).get('/albums');
            expect(response.body).to.eql([]);
        })
    })

    describe("DELETE /:id", function(){
        it("deletes the album with the given id", async function(){
            const firstId = await request(api).post("/albums").send(realAlbum);
            const secondId = await request(api).post("/albums").send(emptyAlbum);
            const response = await request(api).delete("/albums/2");
            expect(response.status).to.eql(204);
            
            const albums = await request(api).get('/albums');
            for(let i=0; i<albums.length; ++i){
                expect(albums[i].id).not.to.eql(2);
            }
        });

        it("responds 400 if there is no song with the given id", async function(){
            const response = await request(api).delete("/albums/99");
            expect(response.status).to.eql(400);
        })
    });

    describe("GET /:id", function(){
        it("returns the album with the given id", async function(){
            const firstId = await request(api).post("/albums").send(realAlbum);
            const response = await request(api).get("/albums/1");
            expect(response.status).to.eql(200);

            expect(response.body).to.eql(realAlbum);
        });

        it("responds 400 if there is no song with the given id", async function(){
            const response = await request(api).get("/albums/99");
            expect(response.status).to.eql(400);
        })

        describe("get n best by given id", function(){
            it("returns the best n song", async function(){
                const firstAlbum = await request(api).post("/albums").send(albumWithEqualFrequencies);
                const response = await request(api).get("/albums/1/best?top=2");
                expect(response.status).to.eql(200);
                expect(response.body).to.eql([{title: "four"}, {title: "three"}]);
            });
        });
    });
});