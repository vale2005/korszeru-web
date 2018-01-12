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
            album.addSong("one", 500);
            album.addSong("two", 1000)
            const response = await request(api).post("/albums").send(album);
            expect(response.status).to.eql(201);
            expect(response.body.songs[0].title).to.eql("one");
            expect(response.body).to.include.key("id");
        })
    })
})