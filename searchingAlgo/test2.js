const haystacks = require("./assets/data/sentences1000");
const {findSimilarItemsByChars, findReapeated, findSimilarItemsByWords} = require("./MinHashLsh");

// const {getSimilarity} = require("./FuzzyMatcher");

const shingleLength = 2;
const bands = 1;
const rows = 1;
console.time("whole task");
const buckets = findSimilarItemsByChars(haystacks, shingleLength, bands , rows);
// console.log(buckets);

console.time('find reapeated');
const reapeated = findReapeated(buckets);
console.timeEnd('find reapeated');

for(let i = 0; i < reapeated.length ; i++){
    let arr = reapeated[i].split(",");
    console.log("print similar items:")
    for(let j = 0; j < arr.length; j++){
        console.log(haystacks[arr[Number(j)]]);
    }
    console.log("\n");
}
console.timeEnd("whole task");