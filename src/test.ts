import {
    getShinglesDisregardRepeated,
    normalizeToVectors
} from './common/Computer';

import {
    getLvstnDistance,
    getCosDistance
} from './common/DistanceCalculator';

function run() : void {
    const string1 = "abcbASDASc";
    const string2 = "fdloAASDFAokup";
    
    const shingles1 = getShinglesDisregardRepeated(string1, 2);
    const shingles2 = getShinglesDisregardRepeated(string2, 2);

    // console.log(shingles1, shingles2)
    const result = normalizeToVectors([shingles1, shingles2]);
    // console.log(result);
    console.log(getLvstnDistance(string1, string2));
    console.log(getCosDistance(shingles1, shingles2));
}

export default run;