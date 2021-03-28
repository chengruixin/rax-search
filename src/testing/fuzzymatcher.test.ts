import {
    getShinglesDisregardRepeated,
    normalizeToVectors
} from '../common/common';

import { hashString } from '../common/hash';

import {
    getLvstnDistance,
    getCosDistance
} from '../common/distanceCalculator';

import {
    produceSimilarItems
} from '../fuzzyMatch/fuzzyMatcher';

export default function test() : void {
    const string1 = "w";
    const string2 = "drink water";
    const string3 = "watermelon"

    console.log(hashString(string1));
    console.log(hashString(string2));
    console.log(hashString(string3));
    
    const shingles1 = getShinglesDisregardRepeated(string1, 2);
    const shingles2 = getShinglesDisregardRepeated(string2, 2);

    // console.log(shingles1, shingles2)
    const result = normalizeToVectors([shingles1, shingles2]);
    // console.log(result);
    console.log(getLvstnDistance(string1, string2));
    console.log(getCosDistance(shingles1, shingles2));

    
}

