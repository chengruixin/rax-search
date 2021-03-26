import {
    getShinglesDisregardRepeated,
    getVectorLength,
    normalizeToVectors,
    randomPermutationGenerator
} from '../common/common';

import {
    hashString,
    hashNumbers,
    projectionHashing
} from '../common/hash';
/**
 * 
 * @param {Vector[]} binaryVectors 
 */


function minHashing(binaryVectors : Array<Array<number>> , signatureLength : number) : Array<Array<number>> {
    const permutator = randomPermutationGenerator(binaryVectors[0].length);

    // a lookup table saving index position for every vector that has 1.
    const existedOnes : Array<Array<number>> = new Array(binaryVectors.length); 

    const signatures : Array<Array<number>> = new Array(binaryVectors.length);

    // record postion of 1s in each vector
    for(let i = 0; i <binaryVectors.length; i++){
        existedOnes[i] = [];
        for(let j = 0; j < binaryVectors[i].length ; j++) {
            if(binaryVectors[i][j] === 1) {
                existedOnes[i].push(j);
            }
        }
    }

    for(let i = 0; i < signatures.length; i++){
        signatures[i] = new Array(signatureLength);
    }

    for(let i = 0; i < signatureLength; i++){
        let currentPermutation = permutator.shuffle();

        for(let j = 0; j < signatures.length; j++) {
            let smallest = currentPermutation[existedOnes[j][0]];

            for(let k = 1; k < existedOnes[j].length; k++){
                let curHashVal = currentPermutation[existedOnes[j][k]];
    
                if(curHashVal < smallest) {
                    smallest = curHashVal;
                }
            }

            signatures[j][i] = smallest;
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
function localitySensitiveHashing(signatures : Array<Array<number>>, bands : number, rows : number){
    const hashMapCollector = new Array(bands);
    const baseVectorCollector = new Array(bands);
    for(let i = 0; i < hashMapCollector.length; i++){
        hashMapCollector[i] = new Map();
        baseVectorCollector[i] = randomPermutationGenerator(rows, true).shuffle(); // produce binary vector with size of "rows"
    }

    for(let i = 0; i < signatures.length; i++){
        
        for(let b = 0; b < bands; b++){

            let keysBundle = []; // this will be the targetVector

            for(let r = 0; r < rows; r++){
                keysBundle.push(signatures[i][b * rows + r]);
            }

            let baseVector = baseVectorCollector[b];
            let M = getVectorLength(baseVector);
            // let bias = Math.floor(Math.random() * M + 1);
            let hashedKey = projectionHashing(keysBundle, baseVector, 0, M);
            
            if (!hashMapCollector[b].has(hashedKey)) {
                hashMapCollector[b].set(hashedKey, [i]);
            } else {
                hashMapCollector[b].get(hashedKey).push(i);
            }
        }
    }

    return hashMapCollector;
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
    const hashMapCollector = localitySensitiveHashing(signatures, bands, rows);

    console.log(hashMapCollector);
    console.log(signatures);
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

