function getShingles(str, len){
    
    if(len >= str.length) return [str];
    
    const ans = [];
    for(let i = 0 ; i + len - 1 < str.length; i++){
        ans.push(str.substring(i, i + len));
        
    }
   
    return ans;
}

module.exports = getShingles;