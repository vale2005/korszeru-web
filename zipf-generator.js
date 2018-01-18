"use strict"

const mathUtils = require("./math-utils");

class ZipfGenerator{
    constructor(frequencyList){
        this.frequencyList = frequencyList;
        this.harmonicNum = mathUtils.calculateNthHarmonicNumber(frequencyList.length);
        this.frequencyListSum = mathUtils.calculateSum(frequencyList);
    }

    calculateQualityIndices(){
        const zipfFrequencies = this._calculateZipfFrequencies();
        return zipfFrequencies.map((zFreq, ind) => this._getNthQualityIndex(zFreq, ind));
    }

    _getNthQualityIndex(zipfFreq, index){
        return this.frequencyList[index]/zipfFreq;
    }

    _calculateZipfFrequencies(){
        const freqencyIndices = mathUtils.generateRangeFrom1ToN(this.frequencyList.length);
        return freqencyIndices.map(pos => this._calculateNthZipfFreqency(pos));
    }

    _calculateNthZipfFreqency(position){
        const zipfProduct = 1/(this.harmonicNum*(position));
        return zipfProduct*this.frequencyListSum;
    }
}

module.exports = ZipfGenerator;