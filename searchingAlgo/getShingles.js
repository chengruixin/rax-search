/**
 * 
 * @param {String} str 
 * @param {Number} len
 * @return {Array} 
 */
function getShingles(str, len){
    
    if(len >= str.length) return [str];
    
    const arr = [];
    for(let i = 0 ; i + len - 1 < str.length; i++){
        arr.push(str.substring(i, i + len));
        
    }
   
    return arr;
}

module.exports = getShingles;