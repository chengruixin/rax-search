function getLvstnDistance(string1, string2) {
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
};

function getCosDistance(string1, string2){
    
    string1 = string1.trim();
    string2 = string2.trim();
    const [vec1 , vec2] = getVectors(string1, string2);
    console.log(vec1, vec2);
    let nume = 0;
    for(let i = 0; i < vec1.length; i++){
        nume += vec1[i] * vec2[i];
    }

    let denomi1 = 0;
    let denomi2 = 0;
    for(let i = 0; i < vec1.length; i++){
        denomi1 += vec1[i] ** 2;
        denomi2 += vec2[i] ** 2;
    }

    return denomi1 === denomi2 ? nume/denomi1 :  nume / ( Math.sqrt(denomi1) * Math.sqrt(denomi2) );
}

function getVectors(string1, string2){
    const vec1 = [];
    const vec2 = [];
    const str1Slot = new Array(128);
    const str2Slot = new Array(128);
    const sharedSlot = new Array(128);
    // console.log(str1Slot);
    for(let i = 0; i < string1.length ; i++){
        str1Slot[string1.charCodeAt(i)] = 1;
        sharedSlot[string1.charCodeAt(i)] = 1;
    }

    for(let i = 0; i < string2.length ; i++){
        str2Slot[string2.charCodeAt(i)] = 1;
        sharedSlot[string2.charCodeAt(i)] = 1;
    }
    for(let i = 0; i < sharedSlot.length; i++){
        if(sharedSlot[i] !== 1) continue;

        if(str1Slot[i] == 1) vec1.push(1);
        else vec1.push(0);

        if(str2Slot[i] == 1) vec2.push(1);
        else vec2.push(0);
    }
    return [vec1, vec2];
}

module.exports = {getLvstnDistance, getCosDistance};