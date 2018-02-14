"use strict"

const { Store , StoreValidationError, StoreFindError} = require("../store");
const { expect } = require("chai");

describe("Albums store", function(){
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

    const albumWithFrequencyMissing = [
        { frequency: 30, title: "one" },
        { title: "two"}
    ];

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
                    await store.create(albumWitTitleMissing);
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