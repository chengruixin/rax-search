import {
    getShinglesDisregardRepeated,
    normalizeToVectors
} from '../common/common';

import { hashString } from '../common/hash';

import {
    getLvstnDistance,
    getCosDistance
} from '../common/distance';

import {
    findSimilarItems
} from '../fuzzyMatch/fuzzyMatcher';

export default function test() : void {
    const string1 = "welooooooooo";
    const string2 = "willooooo";
    const string3 = "WELOeeee"

    const res = findSimilarItems([string1, string2, string3], "welo", {
        isCaseSensitive : true,
        lineToLeft : false
    });

    console.log(res);    
}

