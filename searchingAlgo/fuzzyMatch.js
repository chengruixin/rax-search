const minDistance = require("./minDistance");
const getShingles = require("./getShingles");

/**
 * 
 * @param {String} tested : the main string is being tested
 * @param {String} pattern : try to find a sub string in tested that matched pattern
 * @return {Number} : 
 *  The minimum distance between the tested and the pattern.
 *  Smaller they are, more similar they are.
 */
function fuzzyMatch(tested, pattern){
    const shingles = getShingles(tested, pattern.length);

    let samllest = Number.MAX_SAFE_INTEGER;
    for(let i = 0; i < shingles.length; i++){
        let tempMin = minDistance(shingles[i], pattern);
        samllest = Math.min(tempMin, samllest);
        
    }

    return samllest;
}

module.exports = fuzzyMatch;