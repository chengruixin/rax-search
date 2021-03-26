import {
    getDotProduct,
    getVectorLength
} from './../common/common';

export default function run() {
    console.log(getDotProduct(
        [1, 3, 4 , 10],
        [1, 1, 0, 2]
    ))

    console.log(getVectorLength([1, 2 , 4]));
    console.log(getVectorLength([1]));
}