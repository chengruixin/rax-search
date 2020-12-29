const {
    getShinglesByChars,
    getShinglesByWords, 
    getVectors, 
    getRandomArray
} = require("./Helpers");

/**
 * This is time consuming. It needs optimisation
 * @param {Vector[]} matrix 
 */
function minHashing(matrix, signatureLength){
    let permutations = new Array(signatureLength);//length of signature eventually
    const permutationLength = matrix[0].length;// single permutation length

    /**
     *  produce n = signatureLength permutations
     */
    for(let i = 0; i < permutations.length; i++){
        permutations[i] = getRandomArray(permutationLength);
    }

    /**
     * Min-hashing
     */

    //Intialize signatures
    let signatures = new Array(matrix.length);
    for(let i = 0; i < signatures.length; i++){
        signatures[i] = new Array(permutations.length).fill(0);
    }

    for(let i = 0; i < permutations.length; i++){
        let result = new Array(matrix.length).fill(Number.MAX_VALUE);
        for(let j = 0; j < permutations[i].length; j++){
            let curVal = permutations[i][j];
            for(let k = 0; k < matrix.length; k++){
                if(matrix[k][j] === 0) continue;
                if(result[k] > curVal) {
                    result[k] = curVal;
                    signatures[k][i] = curVal;
                }
            }
        }
    }

    return signatures;
}

/**
 * 
 * @param {Number[][]} signatures 
 * @param {Number} bands 
 * @param {Number} rows 
 * @return {Map} returns the bucket that contains the candidates that might be similar
 */
function localitySensitiveHashing(signatures, bands, rows){
    const buckets = new Map();

    for(let i = 0; i < signatures.length; i++){
        for(let b = 0; b < bands; b++){
            let key = '';
            for(let r = 0; r < rows; r++){
                key += signatures[i][b * rows + r];
            }
            
            /**
             * Bukets : Number -> String("1,2,3,4,5")
             */
            let numKey = Number(key);
            if(!buckets.has(numKey)){
                buckets.set(numKey, String(i));
            }
            else{
                let val = buckets.get(numKey);
                val += "," + String(i);
                buckets.set(numKey, val);
            }
        }
    }

    return buckets;
}

/**
 * 
 * findSimilarItems will use 3-step to compute similar items
 * 1. Shingling
 * 2. Min-hash
 * 3. Locality-sensitive hash
 * Finally, results will be buckets that have indexs of candidates that might be similar
 * 
 * @param {Array[]} haystacks 
 * @param {Number} shingleLength 
 * @param {b val} bands 
 * @param {r val} rows 
 */
function findSimilarItemsByChars(haystacks, shingleLength, bands, rows){
    if(!haystacks || !shingleLength || !bands || !rows) {
        throw new Error("All params must not be empty");
    }
    const signatureLength = bands * rows;
    /**
     * 1. Shingling haystacks
     */
    const shinglesArray = new Array(haystacks.length);
    for(let i = 0; i < shinglesArray.length ; i++){
        shinglesArray[i] = getShinglesByChars(haystacks[i], shingleLength);
    }

    /**
     * 1.1 Compressing shingles to vectors
     */
    const shingleVectors = getVectors(shinglesArray);//the matrix that has vectors that represent shingles

    /**
     * 2. Min-Hashing
     */
    //min-hash the set of vectors
    const signatureMatrix = minHashing(shingleVectors, signatureLength);

    /**
     * 3. Locality-senstive hashing
     * 
     */
    const buckets = localitySensitiveHashing(signatureMatrix, bands, rows);

    return buckets;
}

function findSimilarItemsByWords(haystacks, shingleLength, bands, rows){
    if(!haystacks || !shingleLength || !bands || !rows) {
        throw new Error("All params must not be empty");
    }
    const signatureLength = bands * rows;
    /**
     * 1. Shingling haystacks
     */
    console.time('Shingling haystacks');
    const shinglesArray = new Array(haystacks.length);
    for(let i = 0; i < shinglesArray.length ; i++){
        shinglesArray[i] = getShinglesByWords(haystacks[i].split(" "), shingleLength);
    }
    console.timeEnd('Shingling haystacks');
    /**
     * 1.1 Compressing shingles to vectors
     */
    console.time('shingles to vectors');
    const shingleVectors = getVectors(shinglesArray);//the matrix that has vectors that represent shingles
    console.timeEnd('shingles to vectors');

    /**
     * 2. Min-Hashing
     */
    //min-hash the set of vectors
    console.time('Min-Hashing');
    const signatureMatrix = minHashing(shingleVectors, signatureLength);
    console.timeEnd('Min-Hashing');

    /**
     * 3. Locality-senstive hashing
     * 
     */
    console.time('lsh');
    const buckets = localitySensitiveHashing(signatureMatrix, bands, rows);
    console.timeEnd('lsh');

    return buckets;
}

/* Helpers */
function findReapeated(buckets){
    const set = new Set();

    for(let value of buckets.values()){
        if(value.split(",").length <= 1) continue;
        const excludeReapteded = new Set(value.split(","));
        set.add([...excludeReapteded].join(","));
    }

    return [...set];
}

module.exports = {
    findSimilarItemsByChars,
    findSimilarItemsByWords,
    findReapeated
}
