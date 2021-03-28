import {
    findExactItems
} from '../patternMatch/exact';


export default function run(){

    const finder = findExactItems("abcd");

    console.log(finder.findAll("abcdabcdabcdabcd"));
    console.log(finder.findFirst("abcabccdabcabcd"));
};