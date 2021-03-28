/**
 * Shingling the string (preserve repeated)
 * for example : str "abcbc" is shingled to [ab, bc, cb, bc] if the shingle size is 2
 * @param {String} string 
 * @param {Number} shingleSize
 * @return {Array} 
 */
export function getShinglesPreserveRepeated(string : string, shingleSize : number) : Array<string> {
    if(shingleSize >= string.length) return [string];

    const arr : Array<string> = [];
    let noSpacesString : string = "";

    for(let i = 0; i < string.length; i++){
        if(string.charAt(i) !== " "){
            noSpacesString += string.charAt(i);
        }
    }
    for(let i = 0 ; i + shingleSize - 1 < noSpacesString.length; i++){
        arr.push(noSpacesString.substring(i, i + shingleSize));
        
    }
   

    return arr;
}

/**
 * Shingling the string (disregard repeated)
 * for example : str "abcbc" is shingled to [ab, bc, cb] if the shingle size is 2
 * @param {String} string 
 * @param {Number} shingleSize
 * @return {Array} 
 */
 export function getShinglesDisregardRepeated(string : string, shingleSize : number) : Array<string> {
    if(shingleSize >= string.length) return [string];

    const arr : Array<string> = [];
    const lookupTable : any = {};

    let noSpacesString : string = "";
    
    for(let i = 0; i < string.length; i++){
        if(string.charAt(i) !== " "){
            noSpacesString += string.charAt(i);
        
        }
    }


    for(let i = 0 ; i + shingleSize - 1 < noSpacesString.length; i++){

        let subString : string = noSpacesString.substring(i, i + shingleSize);
        
        if(!lookupTable[subString]) {
            arr.push(subString);
            lookupTable[subString] = 1; //mark as existed
        }   
    }

    return arr;
}


/**
 * 
 * @param {Array<Array<string>>} 
 * @return {Array<Array<number>>} number : 0 | 1;
 * Normalize the tokens/shingles to binary vectors that are 0s or 1s. 
 */
export function normalizeToVectors(matrix : Array<Array<any>>) : Array<Array<number>>{
    const result = [];
    const union = {};
    const lineLookUp = []; //strings in each line will be a lookUp table
    const matrixLength = matrix.length;
    // 1 get union
    for(let i = 0; i < matrixLength; i++) {

        lineLookUp[i] = {};
        for(let j = 0; j < matrix[i].length; j++) {
            let key : string = matrix[i][j];

            // save to union if key does not exist
            if(!union[key]) {
                union[key] = 1;
            }

            // save this key to line look up table itself.
            lineLookUp[i][key] = 1;
        }
    }

    // 2 normalize strings to vectors
    let unionKeys = Object.keys(union);
    for(let i = 0; i < matrixLength; i++) {
        const row : Array<number> = new Array(unionKeys.length); // this will be the normalized vector from the original shingles/strings
        for(let j = 0; j < unionKeys.length; j++){
            let key : string = unionKeys[j];

            if(lineLookUp[i][key]) {
                row[j] = 1;
            } else {
                row[j] = 0;
            }
        }

        result.push(row);
    }

    return result;
}

/**
 * 
 * @param arrayLength : number
 * @returns : Array<number>
 * 
 * Function works similar to permutating an array
 */
export function randomPermutationGenerator(size : number/** the size of the permutation you want to create */, isBinary? : boolean) : { 
    shuffle : Function,
    shuffleNew : Function
} {
    // 1 Initialization
    const baseArray : Array<any> = new Array(size);

    if(!isBinary) {
        for(let i = 0; i < size; i++) {
            baseArray[i] = i;
        }
    } else {
        let numOfOnes = Math.floor(Math.random() * size + 1);

        for(let i = 0; i < size; i++){
            if(numOfOnes > 0) {
                baseArray[i] = 1;
                numOfOnes--;
            } else {
                baseArray[i] = 0;
            }
        }
    }
    

    return {
        /**
         * 
         * @returns the original array when it is initialized
         */
        shuffle : function () : Array<any> {
            for(let i = 0; i < size - 1; i++){
                let swapIndex = Math.floor(Math.random() * (size - i));
        
                //swap
                let temp = baseArray[i];
                baseArray[i] = baseArray[swapIndex + i];
                baseArray[swapIndex + i] = temp;
            }

            return baseArray;
        },

        /**
         * 
         * @returns a new array which used extra memory
         */
        shuffleNew : function() : Array<any> {
            const copiedArray = [...baseArray];

            for(let i = 0; i < size - 1; i++){
                let swapIndex = Math.floor(Math.random() * (size - i));
        
                //swap
                let temp = copiedArray[i];
                copiedArray[i] = copiedArray[swapIndex + i];
                copiedArray[swapIndex + i] = temp;
            }

            return copiedArray;
        }
    }
}

export function getDotProduct(vector1 : Array<number>, vector2 : Array<number>) : number {
    if(vector1.length !== vector2.length) {
        throw new TypeError("Two vectors' length are not equal");
    }

    let res = 0;
    for(let i = 0; i < vector1.length; i++){
        res += vector1[i] * vector2[i];
    }

    return res;
}

export function getVectorLength(vector : Array<number> ) : number {
    let res = 0;

    for(let i = 0; i < vector.length; i++){
        res += vector[i] * vector[i];
    }

    return Math.sqrt(res);
}