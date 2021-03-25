import { randomPermutationGenerator } from './common/Computer';
import findSimilarItems from './ShingMinLos/MinHashLsh'
import documents from './assets/haystacks';



export default function run(){
    findSimilarItems(documents, 3, 3, 3);
    
}


