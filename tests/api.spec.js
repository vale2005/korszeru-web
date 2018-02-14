"use strict"

const request = require('supertest-as-promised');
const api = require('../api');
const Album = require("../album");
const { expect } = require('chai');

describe("HTTP API", function(){

    const emptyAlbum = [];
    
    const albumWithEqualFrequencies = [
        { frequency: 30, title: "one" },
        { frequency: 30, title: "two" },
        { frequency: 30, title: "three" },
        { frequency: 30, title: "four" }
    ];

    const realAlbum =  [
        { frequency: 197812, title: "re_hash" },
        { frequency: 78906, title: "5_4" },
        { frequency: 189518, title: "tomorrow_comes_today" },
        { frequency: 39453, title: "new_genious" },
        { frequency: 210492, title: "clint_eastwood" },
        { frequency: 26302, title: "man_research" },
        { frequency: 22544, title: "punk" },
        { frequency: 19727, title: "sound_check" },
        { frequency: 17535, title: "double_bass" },
        { frequency: 18782, title: "rock_the_house" },
        { frequency: 198189, title: "19_2000" },
        { frequency: 13151, title: "latin_simone" },
        { frequency: 12139, title: "starshine" },
        { frequency: 11272, title: "slow_country" },
        { frequency: 10521, title: "m1_a1" }
    ];

    const albumWitTitleMissing = [
        { frequency: 30, title: "one" },
        { frequency: 30}
    ];
    
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
            const response = await request(api).post("/albums").send(albumWitTitleMissing);
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