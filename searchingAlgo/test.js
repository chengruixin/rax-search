const {getVectors} = require("./Helpers");

let arr = [
    ["abc", "bc"],
    ["bc", "word"],
    ["cd", "pwd"]
]

let vectors = getVectors(arr);
console.log(vectors);