import {
    getRandomArray
} from './common/Computer';

function run() : void {
    const arr = getRandomArray(10);
    const arr2 = getRandomArray(10);
    console.log(arr,arr2);
}

export default run;