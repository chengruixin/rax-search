const {findSimilarItems} = require("./src/MinHashLsh");


const haystacks = [
    "I went to hospital yesterday",
    "Today is a good day to die",
    "I am about to the town, would you come?",
    "Am I talking like that?",
    "I went to the old town about three years ago?",
    "Thinking helps clean your head",
    "We actually are doing a similarity test",
    "See how algo of this could find similar items",
    "So now, I am gonna create small relatively similar items",
    "To see how good this algo could be",
    "This is a sentence ended with a dog",
    "This is a sentence ended with a cat",
    "This is not a similar sentence comparing to former two",
    "A cat is eating a dog at the end of this sentence",
    "Dog went to hospital by the cat",
    "Done",
    "There is an eded a sentence dog with cat"
]


const res = findSimilarItems(haystacks, 2, 10, 5);

console.log(res);