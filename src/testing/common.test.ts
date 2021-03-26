import {hashNumbers} from '../common/hash';

export default function test() {
    let arr1 = [1,2,3];
    let arr2 = [3,4,5];
    let arr3 = [1,2,3.4];
    let arr4 = [1,2,3];

    console.log(hashNumbers(arr1));
    console.log(hashNumbers(arr2));
    console.log(hashNumbers(arr3));
    console.log(hashNumbers(arr4));
}

