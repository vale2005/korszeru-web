"use strict"

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

const albumWithTitleMissing = [
    { frequency: 30, title: "one" },
    { frequency: 30}
];

const albumWithFrequencyMissing = [
    { frequency: 30, title: "one" },
    { title: "two"}
];

module.exports = {
    emptyAlbum, 
    albumWithEqualFrequencies,
    realAlbum, 
    albumWithTitleMissing, 
    albumWithFrequencyMissing
};