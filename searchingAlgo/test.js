const {getCosDistance, getLvstnDistance} = require("./DistanceCalculator");

let str1 = "abcdfefead";
let str2 = ";lbcadlldf";

console.log(getCosDistance(str1,str2));
console.log(getLvstnDistance(str1, str2));