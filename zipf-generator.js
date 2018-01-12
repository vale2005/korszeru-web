"use strict"

const mathUtils = require("./math-utils");

class ZipfGenerator{
    constructor(frequencyList){
        this.frequencyList = frequencyList;
        this.harmonicNum = mathUtils.calculateNthHarmonicNumber(frequencyList.length);
        this.frequencyListSum = mathUtils.calculateSum(frequencyList);
    }

    calculateQualityIndices(){
        const zipfFrequencies = this.calculateZipfFrequencies();
        return zipfFrequencies.map((zFreq, ind) => this.getNthQualityIndex(zFreq, ind));
    }

    getNthQualityIndex(zipfFreq, index){
        return this.frequencyList[index]/zipfFreq;
    }

    calculateZipfFrequencies(){
        const freqencyIndices = mathUtils.generateFirstNNumber(this.frequencyList.length);
        return freqencyIndices.map(pos => this.calculateNthZipfFreqency(pos));
    }

    calculateNthZipfFreqency(position){
        const zipfProduct = 1/(this.harmonicNum*(position));
        return zipfProduct*this.frequencyListSum;
    }
}

module.exports = ZipfGenerator;