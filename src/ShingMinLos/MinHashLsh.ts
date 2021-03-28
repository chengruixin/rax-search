import {
    getShinglesDisregardRepeated,
    getVectorLength,
    normalizeToVectors,
    randomPermutationGenerator
} from '../common/common';
import { getJaccardSim } from '../common/distance';

import {
    hashNumbers,
    hashString,
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
    const bias = new Array(bands);
    for(let i = 0; i < hashMapCollector.length; i++){
        hashMapCollector[i] = new Map();
        baseVectorCollector[i] = randomPermutationGenerator(rows, true).shuffle(); // produce binary vector with size of "rows"
        bias[i] = Math.floor(Math.random() * (getVectorLength(baseVectorCollector[i]) + 1));
    }

    for(let i = 0; i < signatures.length; i++){
        
        for(let b = 0; b < bands; b++){

            let keysBundle = []; // this will be the targetVector

            for(let r = 0; r < rows; r++){
                keysBundle.push(signatures[i][b * rows + r]);
            }

            // let baseVector = baseVectorCollector[b];
            // let M = getVectorLength(baseVector);
            // let hashedKey = projectionHashing(keysBundle, baseVector, 0, M);
            let hashedKey = hashNumbers(keysBundle);
            // let hashedKey : string = "";

            for(let r = 0; r < rows; r++){
                hashedKey += signatures[i][b * rows + r];
            }
            
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

    /**
     * 4. Filter the results
     */
    const filterProcess = (searchTarget) => {
       
        const threshold = Math.pow(1/bands, 1/rows) * 0.6;
        let res = [];
        for(let i = 0; i < hashMapCollector.length; i++){
            for(let value of hashMapCollector[i].values()) {
                if(value.length > 1) {
                    
                    for(let j = 0; j < value.length; j++){
                        if(value[j] === searchTarget) {
                            for(let k = 0; k < value.length; k++){
                                if(k === j ) continue;

                                let sim = getJaccardSim(signatures[value[j]], signatures[value[k]])
                                console.log(documents[value[k]]);
                                console.log(documents[value[j]]);
                                console.log(sim, threshold);
                                if( sim > threshold){
                                    res.push(value[k]);
                                }
                            }
                        }
                    }
                }
            }
        }

        console.log("\nSim:");
        for(let i = 0;i<res.length; i++){
            console.log(documents[res[i]]);
        }
    }   
    
    const mapToTree = ()=>{
        let simCollection = {};

        for(let hashMap of hashMapCollector){
            for(let indexs of hashMap.values()) {
                
                if(indexs.length <= 1) 
                    continue;
                
                    console.log(indexs);

                //All permutation
                for(let i = 0; i < indexs.length - 1; i++){
                    for(let j = i + 1; j < indexs.length; j++){
    
                        let sim = getJaccardSim(documentsInBinaryVectors[indexs[i]], documentsInBinaryVectors[indexs[j]]);
    
                        // Create key-value for indexs[i] if it doesn't exist and give similarity value to its key as indexs[j]
                        if(!simCollection[indexs[i]]){
                            simCollection[indexs[i]] = {}
                        }
                        if(!simCollection[indexs[i]][indexs[j]]){
                            simCollection[indexs[i]][indexs[j]] = sim;
                        }
    
                        // Do the same to indexs[j]
                        if(!simCollection[indexs[j]]){
                            simCollection[indexs[j]] = {};
                        }
                        if(!simCollection[indexs[j]][indexs[i]]) {
                            simCollection[indexs[j]][indexs[i]] = sim;
                        }
                    }
                }
    
            }
        }
        

        return simCollection;
    }
    console.log(signatures);
    console.log(mapToTree());
}


