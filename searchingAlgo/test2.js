const haystacks = require("./../data/test2");
// const haystacks = [
//     "I went to hospital yesterday",
//     "Today is a good day to die",
//     "I am about to the town, would you come?",
//     "Am I talking like that?",
//     "I went to the old town about three years ago?",
//     "Thinking helps clean your head",
//     "We actually are doing a similarity test",
//     "See how algo of this could find similar items",
//     "So now, I am gonna create small relatively similar items",
//     "To see how good this algo could be",
//     "This is a sentence ended with a dog",
//     "This is a sentence ended with a cat",
//     "This is not a similar sentence comparing to former two",
//     "A cat is eating a dog at the end of this sentence",
//     "Dog went to hospital by the cat",
//     "Done",
//     "None"
// ]
const {findSimilarItems, findReapeated} = require("./MinHashLsh");
// const {getSimilarity} = require("./FuzzyMatcher");

const shingleLength = 5;
const bands = 8;
const rows = 2;
console.time("a");
const buckets = findSimilarItems(haystacks, shingleLength, bands , rows);

const reapeated = findReapeated(buckets);

for(let i = 0; i < reapeated.length ; i++){
    let arr = reapeated[i].split(",");
    console.log("print similar items:")
    for(let j = 0; j < arr.length; j++){
        console.log(haystacks[arr[Number(j)]]);
    }
    console.log("\n");
}
console.timeEnd("a");