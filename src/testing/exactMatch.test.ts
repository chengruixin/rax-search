import {
    findExactItems
} from '../exactMatch/patternFinder';


export default function run(){

    const finder = findExactItems("abcd");

    console.log(finder.findAll("abcdabcdabcdabcd"));
    console.log(finder.findFirst("abcabccdabcabcd"));
};