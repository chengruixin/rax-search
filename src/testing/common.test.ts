import {hashNumbers} from '../common/hash';
import {randomPermutationGenerator} from '../common/common';
export default function test() {
    
    for(let i = 0; i < 10; i++){
        console.log(randomPermutationGenerator(10, true).shuffle());
    }

    let gen2 = randomPermutationGenerator(10);

    for(let i = 0; i < 10; i++){
        console.log(gen2.shuffle());
    }

}

