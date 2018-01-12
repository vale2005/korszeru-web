"use strict"

class MathUtils{
    static calculateSum(list){
        const add = (acc, curr) => acc + curr;
        return list.reduce(add,0);
    }

    static calculateNthHarmonicNumber(n){
        const firstNNumber = this.generateFirstNNumber(n);
        const addInverse = (accumulator, curr) => accumulator + 1/curr;
        return firstNNumber.reduce(addInverse, 0);
    }

    static generateFirstNNumber(n){
        const arr = [];
        for(let i=0; i<n; ++i){
            arr.push(i+1);
        }
        return arr;
    }
}

module.exports = MathUtils;