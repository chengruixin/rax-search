import {hashNumbers} from './../common/Computer';

function run() {
    let arr1 = [1,2,3];
    let arr2 = [3,4,5];
    let arr3 = [1,2,3.4];
    let arr4 = [1,2,3];

    console.log(hashNumbers(arr1));
    console.log(hashNumbers(arr2));
    console.log(hashNumbers(arr3));
    console.log(hashNumbers(arr4));
}

export default run;