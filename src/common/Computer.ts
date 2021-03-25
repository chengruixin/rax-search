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
    for(let i = 0 ; i + shingleSize - 1 < string.length; i++){
        arr.push(string.substring(i, i + shingleSize));
        
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
    for(let i = 0 ; i + shingleSize - 1 < string.length; i++){

        let subString : string = string.substring(i, i + shingleSize);

        if(!lookupTable[subString]) {
            arr.push(string.substring(i, i + shingleSize));
            lookupTable[subString] = 1; //mark as existed
        }   
    }

    return arr;
}


/**
 * 
 * @param {Array<Array<string>>} 
 * @return {Array<Array<number>>} number : 0 | 1;
 * Normalize the tokens/shingles to vectors that are 0s or 1s. 
 */

export function normalizeToVectors(matrix : Array<Array<string>>) : Array<Array<number>>{
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
export function getRandomArray(arrayLength : number) : Array<number>{
    const arr = new Array(arrayLength);

    for(let i = 0; i < arrayLength; i++){
        arr[i] = i;
    }

    for(let i = 0; i < arrayLength; i++){
        let swapIndex = Math.floor(Math.random() * (arrayLength - i));

        //swap
        let temp = arr[i];
        arr[i] = arr[swapIndex + i];
        arr[swapIndex + i] = temp;
    }

    return arr;
}

/**
 * 
 * @param string 
 * @returns Number: hashcode
 * xyz => x * b^2 + y * b + z
 */
export function hashString(string : string) : number {
    let hash = 0;

    let M = 1e9 + 9;
    let B = 31;

    for(let i = 0; i < string.length; i++){
        let c = string.charCodeAt(i);

        hash = (hash * B + c) % M;
    }

    return hash;
}


/**
 * 
 * @param string 
 * @returns Number: hashcode
 * xyz => x + y * b + z * b^2
 */
export function hashString_increasedPow(string : string) : number {
    let hash = 0;
    let M = 1e9 + 9;
    let B = 31;
    let pow = 1;
    for(let i = 0; i < string.length; i++){
        let c = string.charCodeAt(i);

        hash = ( hash + c * pow ) % M;
        pow = ( pow * B ) % M; 
    }

    return hash;
}

export function hashString_copy(string : string) : number {
    let hash = 0;

    for(let i = 0; i < string.length; i++){
        let c = string.charCodeAt(i);
        hash = ((hash<<5)-hash) + c;
        hash = hash & hash; 
    }

    return hash;
}
