import { randomPermutationGenerator } from './common/Computer';

export default function run(){

    let gen = randomPermutationGenerator(5);
    let last;
    for(let i = 0; i < 10; i++){
        
        let cur = gen.shuffleNew();

        if(last) {
            console.log(last === cur);
        }

        console.log(cur);

        last = cur;
    }
    
}


