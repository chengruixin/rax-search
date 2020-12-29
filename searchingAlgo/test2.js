const haystacks = require("./assets/data/sentences1000");
const {findSimilarItems, findReapeated} = require("./MinHashLsh");
// const {getSimilarity} = require("./FuzzyMatcher");

const shingleLength = 4;
const bands = 5;
const rows = 8;
console.time("a");
const buckets = findSimilarItems(haystacks, shingleLength, bands , rows);
// console.log(buckets);
const reapeated = findReapeated(buckets);
console.log(reapeated);
for(let i = 0; i < reapeated.length ; i++){
    let arr = reapeated[i].split(",");
    console.log("print similar items:")
    for(let j = 0; j < arr.length; j++){
        console.log(haystacks[arr[Number(j)]]);
    }
    console.log("\n");
}
console.timeEnd("a");