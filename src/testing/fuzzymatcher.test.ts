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
    const string1 = "welooooooooo";
    const string2 = "willooooo";
    const string3 = "WELOeeee"

    const res = produceSimilarItems([string1, string2, string3], "welo", {
        isCaseSensitive : true,
        lineToLeft : false
    });

    console.log(res);    
}

