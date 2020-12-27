const arr = [1,2,3,4];

const pad = new Array(4).fill(new Array(3).fill(0))

for(let j = 0; j < 3 ; j++){
    for(let i = 0; i < arr.length; i++){
        pad[i][j] = arr[i];
    }
}


console.log(pad);