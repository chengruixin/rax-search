function computeNext(pattern : string) : Array<number> {
    if(pattern.length <= 0) return [];

    const next : Array<number> = new Array(pattern.length);

    let prefix : number = 0;
    next[0] = 0;

    for( let suffix = 1; suffix < next.length; suffix++ ){
        while(prefix > 0 && pattern.charAt(prefix) !== pattern.charAt(suffix))
            prefix = next[prefix - 1];
        
        if(pattern.charAt(prefix) === pattern.charAt(suffix))
            prefix++;
        
        next[suffix] = prefix;
    }

    return next;
}

export function findExactItems(pattern : string){
    //concrete "next" array for this pattern;
    const next = computeNext(pattern);
    
    //right move the next
    for(let i = next.length - 1; i >= 1; i--){
        next[i] = next[i - 1];
    }
    next[0] = -1;

    return {
        findAll (haystack : string) : Array<number> {
            const result = [];

            let haystackPointer = 0;
            let patternPointer = 0;

            while (haystackPointer < haystack.length) {

                // no char is matched, it will next index to be matching according to "next" array
                if(haystack.charAt(haystackPointer) !== pattern.charAt(patternPointer)){
                    if(next[patternPointer] === -1) { // no sub-pattern is found, needs to move the haystack pointer forward
                        haystackPointer++;
                    } else {
                        patternPointer = next[patternPointer];
                    }
                } else {
                    // found matched char
                    haystackPointer++;
                    patternPointer++;

                    if (patternPointer >= pattern.length) {
                        result.push( haystackPointer - pattern.length );
                        haystackPointer = haystackPointer - pattern.length + 1; // only move the index, from matched string, 1 forward
                        patternPointer = 0;
                    }
                }
            }

            return result;
        },

        findFirst(haystack : string) : number {
            let result = -1;
            let haystackPointer = 0;
            let patternPointer = 0;

            while (haystackPointer < haystack.length) {
                
                // no char is matched, it will next index to be matching according to "next" array
                if(haystack.charAt(haystackPointer) !== pattern.charAt(patternPointer)){
                    if(next[patternPointer] === -1) { // no sub-pattern is found, needs to move the haystack pointer forward
                        haystackPointer++;
                    } else {
                        patternPointer = next[patternPointer];
                    }
                } else {
                    // found matched char
                    haystackPointer++;
                    patternPointer++;

                    if (patternPointer >= pattern.length) {
                        result = haystackPointer - pattern.length;
                        break;
                    }
                }
            }

            return result;
        }
    }
}
