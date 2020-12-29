const fuzzy = require('fuzzy');
const haystacks = require("./assets/data/words1000");
const {produceSimilarItems} = require("./FuzzyMatcher");
let search = 'asdfse';

console.time("npm runtime");
const npmRes = fuzzy.filter(search, haystacks);
const matches = npmRes.map((el) => el.string);
console.log(matches);
console.timeEnd("npm runtime");


console.time('my runtime');
const myRes = produceSimilarItems(haystacks, search);
const matches2 = [];
for(let i = 0; i < 10; i++){
    matches2.push(myRes[i]);
}
console.log(matches2);
console.timeEnd("my runtime");