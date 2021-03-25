import { randomPermutationGenerator } from '../common/Computer';
import findSimilarItems from '../ShingMinLos/MinHashLsh'
import {case1, case2} from '../assets/haystacks';



export default function run(){
    console.time("test");
    findSimilarItems(case1, 2, 4, 5);
    findSimilarItems(case2, 2, 4, 5);
    console.timeEnd("test");
}


