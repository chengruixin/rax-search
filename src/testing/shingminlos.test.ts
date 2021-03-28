import { randomPermutationGenerator } from '../common/common';
import findSimilarItems from '../shingMinLos/minHashLsh'
import {case1, case2} from '../assets/haystacks';



export default function test(){
    console.time("test");
    findSimilarItems(case1, 2, 4, 4);
    console.timeEnd("test");
}


