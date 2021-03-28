import {
    normalizeToVectors,
    getDotProduct
} from './common';

export function getLvstnDistance(string1 : string, string2 : string) {
    //dp init
    const dp = new Array(string1.length + 1);

    for(let i = 0; i < dp.length; i++){
        dp[i] = new Array(string2.length + 1);
    }

    //assign values
    dp[0][0] = 0;
    for(let i = 1; i < dp.length; i++){
        dp[i][0] = i;
    }

    for(let i = 1; i < dp[0].length; i++){
        dp[0][i] = i;
    }

    for(let i = 1; i < dp.length; i++){
        for(let j = 1; j < dp[i].length; j++){
            if(string1.charAt(i - 1) === string2.charAt(j - 1))
                dp[i][j] = dp[i - 1][j - 1];
            else 
                dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1;
            
        }
    }

    return dp[string1.length][string2.length];
}

export function getCosDistance(shingles1 : Array<string>, shingles2 : Array<string>) : number { 
    const [vec1 , vec2] = normalizeToVectors([shingles1, shingles2]);
    let dotProduct :number = getDotProduct(vec1, vec2);
    
    let vecLen1 : number = 0;
    let vecLen2 : number = 0;
    for(let i = 0; i < vec1.length; i++){
        vecLen1 += vec1[i] ** 2;
        vecLen2 += vec2[i] ** 2;
    }
   
    return vecLen1 === vecLen2 ? dotProduct/vecLen1 :  dotProduct / ( Math.sqrt(vecLen1) * Math.sqrt(vecLen2) );
}


export function getJaccardSim(vector1 : Array<number>, vector2 : Array<number>) {

    if(vector1.length !== vector2.length) {
        throw new Error("Unmatched vector length");
    }

    let intersections = 0;
    let unions = 0;
    for(let i = 0; i < vector1.length; i++){
        if(vector1[i] !== vector2[i]) {
            unions++;
        } else if(vector1[i] !== 0) {
            unions++;
            intersections++;
        }
    }

    return intersections/unions;

}


// export function getJaccardDis(params:type) {
    
// }