import {getCosDistance, getLvstnDistance} from '../common/distance';
import {getShinglesDisregardRepeated} from '../common/common';

/**
 * 
 * @param {String[]} haystacks 
 * @param {String} pattern
 * @return {Object} {
 *      String : "str1xxxx",
 *      Similarity : 0 - 100
 * } 
 */

interface settingsSchema {
    isCaseSensitive ?: boolean,
    lineToLeft ?: boolean,
}

let defaultSettings : settingsSchema = {
    isCaseSensitive : true,
    lineToLeft : false,
}
export function findSimilarItems(haystacks : Array<string>, pattern : string, settings? : settingsSchema) : Array<string> {
    //pre-configure settings 
    Object.setPrototypeOf(settings, defaultSettings);
    const {isCaseSensitive, lineToLeft} = settings;
    const similarItems = [];

    if(!isCaseSensitive) 
        pattern = pattern.toLowerCase();

    for(let i = 0; i < haystacks.length; i++){
        
        let haystack = "";

        if(lineToLeft) {
            haystack = haystacks[i].substring(0, pattern.length);
        } else {
            haystack = haystacks[i];
        }

        if(!isCaseSensitive) {
            haystack = haystack.toLowerCase();
        }

        const sim = getSimilarity(haystack, pattern);

        similarItems.push({
            string : haystacks[i],//needs to be original string
            similarity : sim
        })
    }
    
    similarItems.sort((obj1, obj2) => obj2.similarity - obj1.similarity);// decreasing order

    return similarItems;
}


export function getSimilarity(string1, string2){
    const shingleLenth = 2;
    const cosSimWeight = 50;
    let cosSim = getCosDistance( getShinglesDisregardRepeated(string1, shingleLenth) , getShinglesDisregardRepeated(string2, shingleLenth));
    let lvstnSim = 1 - getLvstnDistance(string1, string2) / (Math.max(string1.length, string2.length));

    return cosSim * cosSimWeight + lvstnSim * (100 - cosSimWeight);
}


