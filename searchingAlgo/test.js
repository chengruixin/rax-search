const {produceSimilarItems} = require("./FuzzyMatcher");
const haystacks = require("./../data/test");

console.time("f");

let pattern = "appceleratortitanium";
let arrByNew = produceSimilarItems(haystacks, pattern);

let iterations = 10;
for(let i = 0 ; i < iterations ; i++){
    console.log(arrByNew[i]);
}


console.timeEnd("f");