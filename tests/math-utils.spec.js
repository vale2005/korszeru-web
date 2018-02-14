const MathUtils = require('../math-utils');
const { expect } = require('chai');

describe("Math utils", function(){
    describe("calculuate harmonic number", function(){
        describe("given 2", function(){
            it("returns the second harmonic number", function(){
                const secondHarmNumber = 1/1 + 1/2;
                const result = MathUtils.calculateNthHarmonicNumber(2);
                expect(result).to.eql(secondHarmNumber);
            });
        });
    });

    describe("calculuate sum", function(){
        describe("given a list of numbers", function(){
            it("returns their summation", function(){
                const result = MathUtils.calculateSum([10,20,30]);
                expect(result).to.eql(10+20+30);
            });
        });
    });
    

})