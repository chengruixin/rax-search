const {getShingles, getVectors, getRandomArray} = require("./Computer");

const haystacks = [
    "I went to hospital yesterday",
    "Today is a good day to die",
    "I am about to the town, would you come?",
    "Am I talking like that?",
    "I went to the old town about three years ago?",
    "Thinking helps clean your head",
    "We actually are doing a similarity test",
    "See how algo of this could find similar items",
    "So now, I am gonna create small relatively similar items",
    "To see how good this algo could be",
    "This is a sentence ended with a dog",
    "This is a sentence ended with a cat",
    "This is not a similar sentence comparing to former two",
    "A cat is eating a dog at the end of this sentence",
    "Dog went to hospital by the cat",
    "Done"
]

/**
 * 
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
    
    // permutations = [
    //     [2,3,7,6,1,5,4],
    //     [4,2,1,3,6,7,5],
    //     [3,4,7,2,6,1,5]
    // ];

    /**
     * Min-hashing
     */
    let signatures = new Array(matrix.length);
    for(let i = 0; i < signatures.length; i++){
        signatures[i] = new Array(permutations.length).fill(0);
    }
    // const signatures = [];
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


void function main(){
    const shingleLength = 5;
    const signatureLength = 20;
    /**
     * 1. Shingling haystacks
     */
    const shinglesArray = new Array(haystacks.length);

    for(let i = 0; i < shinglesArray.length ; i++){
        shinglesArray[i] = getShingles(haystacks[i], shingleLength);
    }

    /**
     * 1.1 Compressing shingles to vectors
     */
    const shingleVectors = getVectors(shinglesArray);//the matrix that has vectors that represent shingles

    /**
     * 2. Min-Hash
     */
    //min-hash the set of vectors
    const signatureMatrix = minHashing(shingleVectors, signatureLength);
    console.log(signatureMatrix);
}() 

// void function test(){
//     const matrix = [
//         [1,1,0,0,0,1,1],
//         [0,0,1,1,1,0,0],
//         [1,0,0,0,0,1,1],
//         [0,1,1,1,1,0,0]
//     ]
    
//     const signatures = minHashing(matrix, 3);
//     console.log(signatures);
// }()