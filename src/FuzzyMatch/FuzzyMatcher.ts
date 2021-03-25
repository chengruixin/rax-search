import {getCosDistance, getLvstnDistance} from '../common/DistanceCalculator';

interface param {
    isCaseSensitive : boolean,
    lineToLeft : boolean
}

/**
 * 
 * @param {String[]} haystacks 
 * @param {String} pattern
 * @return {Object} {
 *      String : "str1xxxx",
 *      Similarity : 0 - 100
 * } 
 */
export function produceSimilarItems(haystacks : Array<string>, pattern : string, settings : param) : Array<string> {
    const {isCaseSensitive, lineToLeft} = settings;
    const similarItems = [];
    
    
    if(!isCaseSensitive) pattern = pattern.toLowerCase();

    for(let i = 0; i < haystacks.length; i++){
        
        const haystack = isCaseSensitive && isCaseSensitive === true 
            ? haystacks[i] 
            : haystacks[i].toLowerCase();

        const sim = this.getSimilarity(haystack, pattern);

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
    let cosSim = this.getCosDistance( this.getShingles(string1, shingleLenth) , this.getShingles(string2, shingleLenth));
    let lvstnSim = 1 - this.getLvstnDistance(string1, string2) / (Math.max(string1.length, string2.length));

    return cosSim * cosSimWeight + lvstnSim * (100 - cosSimWeight);
}


