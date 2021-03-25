import { randomPermutationGenerator } from './common/Computer';
import findSimilarItems from './ShingMinLos/MinHashLsh'
import documents from './assets/haystacks';



export default function run(){
    console.time("test");
    findSimilarItems(documents, 3, 3, 3);
    console.timeEnd("test");
}


