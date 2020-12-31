const haystacks = require("./assets/data/sentences100000");
const {findSimilarItemsByChars, findReapeated, findSimilarItemsByWords} = require("./MinHashLsh");

// const {getSimilarity} = require("./FuzzyMatcher");

const shingleLength = 2;
const bands = 2;
const rows = 2;
console.time("whole task");
const buckets = findSimilarItemsByChars(haystacks, shingleLength, bands , rows);
// console.log(buckets);

console.time('find reapeated');
const reapeated = findReapeated(buckets);
console.timeEnd('find reapeated');

for(let i = 0; i < reapeated.length && i < 10 ; i++){
    let arr = reapeated[i].split(",");
    console.log("print similar items:")
    for(let j = 0; j < arr.length && j < 10; j++){
        console.log(haystacks[arr[Number(j)]]);
    }
    console.log("\n");
}
console.timeEnd("whole task");