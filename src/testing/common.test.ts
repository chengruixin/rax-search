import {hashNumbers} from '../common/hash';
import {randomPermutationGenerator, getShinglesDisregardRepeated} from '../common/common';
import {case1, case2} from '../assets/haystacks';
export default function test() {
    console.log(hashNumbers([5,2,0,4]))
    console.log(hashNumbers([0,2,3,1]))
    console.log(hashNumbers([0,1,0,3]))
    console.log(hashNumbers([1,0,1,2]))
    console.log(hashNumbers([0,1,7,0]))
    console.log(hashNumbers([4,4,7,12]))
    
}

// [
//     5, 2, 0, 4, 0,
//     1, 0, 3, 0, 1,
//     7, 0
//   ],

// [
//     0,  2, 3, 1, 1,
//     0,  1, 2, 4, 4,
//     7, 12
//   ],