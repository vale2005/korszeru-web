"use strict";

var ZipfGenerator = require("../zipf-generator");
var MathUtils = require("../math-utils")
var { Album } = require("../best-songs-finder");
const { expect } = require("chai");

describe("Zipf generator", function(){
    describe("calculate zipf frequencies", function(){
        describe("given a list with two elemens", function(){
            it("returns their estimated frequencies according to the Zipf law", function(){
                const frequencyList = [9,9];
                const secondHarmonicNum =  MathUtils.calculateNthHarmonicNumber(2);
                const frequencyListSum =  MathUtils.calculateSum(frequencyList);
                const gen = new ZipfGenerator(frequencyList)
                const result = gen.calculateZipfFrequencies();
                expect(result.length).to.eql(2);
                const firstZipfFreq = frequencyListSum*(1/(1*secondHarmonicNum));
                const secondZipfFreq = frequencyListSum*(1/(2*secondHarmonicNum));
                expect(result[0]).to.eql(firstZipfFreq);
                expect(result[1]).to.eql(secondZipfFreq);
            });
        });

        describe("given a list with three elemens", function(){
            it("returns their estimated frequencies according to the Zipf law", function(){
                const frequencyList = [10,20,30];
                const thirdHarmonicNum =  MathUtils.calculateNthHarmonicNumber(3);
                const frequencyListSum =  MathUtils.calculateSum(frequencyList);
                const gen = new ZipfGenerator(frequencyList)
                const result = gen.calculateZipfFrequencies();
                expect(result.length).to.eql(3);
                const firstZipfFreq = frequencyListSum*(1/(1*thirdHarmonicNum));
                const secondZipfFreq = frequencyListSum*(1/(2*thirdHarmonicNum));
                const thirdZipfFreq = frequencyListSum*(1/(3*thirdHarmonicNum));
                expect(result[0]).to.eql(firstZipfFreq);
                expect(result[1]).to.eql(secondZipfFreq);
                expect(result[2]).to.eql(thirdZipfFreq);
            });
        });
    });

    describe("calculate quality indices", function(){
        describe("given a list with two elemens", function(){
            it("returns their quality indices", function(){
                const frequencyList = [9,9];
                const gen = new ZipfGenerator(frequencyList);
                const ZipfFrequencies = gen.calculateZipfFrequencies();
                const result = gen.calculateQualityIndices();
                expect(result.length).to.eql(2);
                const firstQualityIndex = frequencyList[0]/ZipfFrequencies[0];
                const secondQualityIndex = frequencyList[1]/ZipfFrequencies[1];
                expect(result[0]).to.eql(firstQualityIndex);
                expect(result[1]).to.eql(secondQualityIndex);
            });
        });
    });

    describe("given a list with three elemens", function(){
        it("returns their estimated frequencies according to the Zipf law", function(){
            const frequencyList = [30,20,10];
            const gen = new ZipfGenerator(frequencyList);
            const ZipfFrequencies = gen.calculateZipfFrequencies();
            const result = gen.calculateQualityIndices();
            expect(result.length).to.eql(3);
            const firstQualityIndex = frequencyList[0]/ZipfFrequencies[0];
            const secondQualityIndex = frequencyList[1]/ZipfFrequencies[1];
            const thirdQualityIndex = frequencyList[2]/ZipfFrequencies[2];
            expect(result[0]).to.eql(firstQualityIndex);
            expect(result[1]).to.eql(secondQualityIndex);
            expect(result[2]).to.eql(thirdQualityIndex);
            expect(result[0]).to.below(1);
            expect(result[1]).to.above(1);
            expect(result[2]).to.below(1);
            expect(result[2]).to.above(result[0]);
        });
    });
});
    

