import {
    getShinglesDisregardRepeated,
    normalizeToVectors,
    hashString
} from './common/Computer';

import {
    getLvstnDistance,
    getCosDistance
} from './common/DistanceCalculator';


import {
    produceSimilarItems
} from './FuzzyMatch/FuzzyMatcher';
function run() : void {
    const string1 = "w";
    const string2 = "drink water";
    const string3 = "watermelon"

    console.log(hashString(string1));
    console.log(hashString(string2));
    console.log(hashString(string3));
    
    // const shingles1 = getShinglesDisregardRepeated(string1, 2);
    // const shingles2 = getShinglesDisregardRepeated(string2, 2);

    // // console.log(shingles1, shingles2)
    // const result = normalizeToVectors([shingles1, shingles2]);
    // // console.log(result);
    // console.log(getLvstnDistance(string1, string2));
    // console.log(getCosDistance(shingles1, shingles2));

    // produceSimilarItems(["df", "fd"], "f", )
}

export default run;