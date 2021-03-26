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

export function hashNumbers(numbers : Array<number>) : number {
    let hash = 0;

    let M = 1e9 + 9;
    let B = 31;

    for (let i = 0; i < numbers.length; i++) {
        hash = ( hash % B + numbers[i] ) % M;
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
