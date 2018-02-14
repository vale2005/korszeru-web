"use strict"

const { Store , StoreValidationError, StoreFindError} = require("../store");
const { expect } = require("chai");

const {
    emptyAlbum, 
    albumWithEqualFrequencies, 
    realAlbum, 
    albumWithTitleMissing, 
    albumWithFrequencyMissing
} = require("./album-consts");

describe("Albums store", function(){

    it("is empty when created", async function(){
        const store = new Store();
        const albums = await store.getAll();
        expect(albums.length).to.eql(0);
    });

    describe("adding an album", function(){
        it("returns the ID of the created album", async function(){
            const store = new Store();
            const result = await store.create(realAlbum);
            expect(result).to.eql({id: 1});
        });

        describe("a song has no title", function(){
            it("throws an exception", async function(){
                const store = new Store();
                try {
                    await store.create(albumWithTitleMissing);
                }catch(error){
                    expect(error).to.be.instanceof(StoreValidationError);
                    expect(error.message).to.include("missing");
                    expect(error.message).to.include("title");
                    return;
                }
                throw new Error("should have thrown missing title exception");
            });
        });

        describe("a song has no frequency", function(){
            it("throws an exception", async function(){
                const store = new Store();
                try {
                    await store.create(albumWithFrequencyMissing);
                }catch(error){
                    expect(error).to.be.instanceof(StoreValidationError);
                    expect(error.message).to.include("missing");
                    expect(error.message).to.include("frequency");
                    return;
                }
                throw new Error("should have thrown missing frequency exception");
            });
        });
    });

    describe("getting an album by id", function(){
        it("returns the album with the given id", async function(){
            const store = new Store();
            await store.create(realAlbum);
            const result = await store.getById(1);

            expect(result).to.eql(realAlbum);
        });

        it('throws error if album is not found', async function() {
            const store = new Store();
            try {
              await store.getById(56);
            }catch(error){
                expect(error).to.be.instanceof(StoreFindError);
                expect(error.message).to.include('missing');
                expect(error.message).to.include('album');
                return;
            }
      
            throw new Error('should have thrown error about missing album');
          });
    });

    describe("deleting an album by id", function(){
        it("is not on in the albums", async function(){
            const store = new Store();
            const firstCreated = await store.create(realAlbum);
            const secondCreated = await store.create(emptyAlbum);
            await store.deleteById(secondCreated.id);

            const remaining = await store.getAll();
            for(let i=0; i<remaining.length; i++){
                expect(remaining[i].id).not.to.eql(secondCreated.id);
            }
        });

        it("throws error if the album does not exist", async function() {
            const store = new Store();
            
            try {
              await store.deleteById(56);
            } catch (error) {
              expect(error).to.be.instanceof(StoreFindError);
              expect(error.message).to.include('missing');
              expect(error.message).to.include('album');
              return;
            }
      
            throw new Error('should have thrown error about missing album');
          });
    });

    describe("delete all", function(){
        it("is empty", async function(){
            const store = new Store();
            const firstCreated = await store.create(realAlbum);
            const secondCreated = await store.create(realAlbum);
            await store.deleteAll();

            const remaining = await store.getAll();
            expect(remaining).to.eql([]);

        });
    });
});