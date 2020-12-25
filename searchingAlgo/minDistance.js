function minDistance(word1, word2) {
    //dp init
    const dp = new Array(word1.length + 1);

    for(let i = 0; i < dp.length; i++){
        dp[i] = new Array(word2.length + 1);
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
            if(word1.charAt(i - 1) === word2.charAt(j - 1))
                dp[i][j] = dp[i - 1][j - 1];
            else 
                dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1;
            
        }
    }

    return dp[word1.length][word2.length];
};

module.exports = minDistance;