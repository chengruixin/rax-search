const {getShinglesByChars, getShinglesByWords} = require("./Helpers");

let string1 = "adf dl jasdf asdfa asdf";

console.log(getShinglesByWords(string1.split(" "), 2));

let string = "adf dl jasdf asdfa asdf";
console.log(getShinglesByChars(string, 3));