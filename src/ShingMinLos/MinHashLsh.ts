import {
    getShinglesDisregardRepeated,
    normalizeToVectors,
    randomPermutationGenerator,
    hashString
} from './../common/Computer';

/**
 * 
 * @param {Vector[]} binaryVectors 
 */
function minHashing(binaryVectors, signatureLength){
    let permutations = new Array(signatureLength);//length of signature eventually
    const permutationLength = binaryVectors[0].length;// single permutation length

    /**
     *  produce n = signatureLength permutations
     */
    for(let i = 0; i < permutations.length; i++){
        // permutations[i] = getRandomArray(permutationLength);
    }

    /**
     * Min-hashing
     */

    //Intialize signatures
    let signatures = new Array(binaryVectors.length);
    for(let i = 0; i < signatures.length; i++){
        signatures[i] = new Array(permutations.length).fill(0);
    }

    for(let i = 0; i < permutations.length; i++){
        let result = new Array(binaryVectors.length).fill(Number.MAX_VALUE);
        for(let j = 0; j < permutations[i].length; j++){
            let curVal = permutations[i][j];
            for(let k = 0; k < binaryVectors.length; k++){
                if(binaryVectors[k][j] === 0) continue;
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
                if(r != rows - 1) {
                    key += signatures[i][b * rows + r] + '#';
                }
                else {
                    key += signatures[i][b * rows + r];
                }
            }

            if(!buckets.has(key)){
                buckets.set(key, [i]);
            }
            else{
                let val = buckets.get(key);
                val.push(i);
                buckets.set(key, val);
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
 * @param {Array[]} documents 
 * @param {Number} shingleLength 
 * @param {b val} bands 
 * @param {r val} rows 
 */
export default function findSimilarItems(documents : Array<any>, shingleLength : number, bands : number, rows : number){

    const signatureLength = bands * rows;
    /**
     * 1. Shingling documents
     */
    const documentsInHashedShingles : Array<Array<any>> = new Array(documents.length);
    for(let i = 0; i < documents.length ; i++){
        documentsInHashedShingles[i] = [];
        let shingles : Array<string> = getShinglesDisregardRepeated(documents[i], shingleLength);

        for(let j = 0; j < shingles.length; j++){
            documentsInHashedShingles[i].push(hashString(shingles[j]));
            // documentsInHashedShingles[i].push(shingles[j]); 
        }
    }
    
    /**
     * 1.1 Normalizing shingles to binary vectors
     */
    const documentsInBinaryVectors = normalizeToVectors(documentsInHashedShingles)

    /**
     * 2. Min-Hashing
     */
    const signatures = minHashing(documentsInBinaryVectors, signatureLength);

    /**
     * 3. Locality-senstive hashing
     * 
     */
    // const buckets = localitySensitiveHashing(signatureMatrix, bands, rows);

    // return buckets;
}

function findReapeated(buckets){
    const set = new Set();

    for(let value of buckets.values()){
        if(value.length <= 1) continue;
        const excludeReapteded = new Set(value);
        set.add([...excludeReapteded].join(","));
    }

    return [...set];
}

