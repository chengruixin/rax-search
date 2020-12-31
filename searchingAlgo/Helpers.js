/**
 * 
 * @param {String} str 
 * @param {Number} len
 * @return {Array} 
 */
function getShinglesByChars(str, len){
    
    if(len >= str.length) return [str];
    
    const arr = [];
    for(let i = 0 ; i + len - 1 < str.length; i++){
        arr.push(str.substring(i, i + len));
        
    }
   
    return arr;
}

/**
 * 
 * @param {Array[]} items 
 * @param {Number} len
 * @return {Array} 
 */
function getShinglesByWords(items, len){
    
    if(len >= items.length) return [items];
    
    const ans = [];
    for(let i = 0 ; i + len - 1 < items.length; i++){

        let str = '';

        for(let j = i; j < len + i; j++){
            str += items[j];
            
        }
        ans.push(str);
        
    }
   
    return ans;
}

/**
 * 
 * @param {Array[][]}  
 *  
 */
// function getVectors(dimensionalArray){
//     console.time("constructed");
//     console.log("size : ", dimensionalArray.length);
//     console.log("length : " , dimensionalArray[0].length);
//     console.log("el : ", dimensionalArray[0][0]);
//     let map = new Map();

//     for(let i = 0; i < dimensionalArray.length; i++){
//         for(let j = 0; j < dimensionalArray[i].length; j++){
//             if(!map.has(dimensionalArray[i][j])){
//                 let lookUpArr = new Array(dimensionalArray.length).fill(0);
//                 lookUpArr[i] = 1;
//                 map.set(dimensionalArray[i][j], lookUpArr);
//             }
//             else{
//                 map.get(dimensionalArray[i][j])[i] = 1;
//             }
//         }
//     }
    
//     console.timeEnd("constructed");

//     console.log(map.size, dimensionalArray.length)
//     let vectors = new Array(dimensionalArray.length);
//     for(let i = 0; i < vectors.length; i++){
//         vectors[i] = new Array(map.size);
//     }
//     let j = 0;
//     for(let lookUpArr of map.values()){
        
//         for(let i = 0; i < lookUpArr.length; i++){
//             // vectors[i].push(lookUpArr[i]);
//             vectors[i][j] = lookUpArr[i];
//         }

//         j++;
//     }

//     return vectors;
// }

/**
 * 
 * @param {Array[][]}  
 *  
 */
function getVectors(matrix){
    console.time("half");
    const lines = new Array(matrix.length);;
    const union = new Set();
    
    console.log("size : ", matrix.length);
    console.log("length : " , matrix[0].length);
    console.log("el : ", matrix[0][0])
    for(let i = 0; i < matrix.length; i++){

        lines[i] = new Set();
        for(let j = 0; j < matrix[i].length; j++){
            //each element will be added to union
            union.add(matrix[i][j]);

            //the set representing the current line also will add this new element
            lines[i].add(matrix[i][j]);

           
        }

        
    }
    
    console.timeEnd("half");
    const vectorsMatrix = new Array(lines.length);
    console.log(union.size, vectorsMatrix.length);
    for(let i = 0; i < lines.length ; i++){
        vectorsMatrix[i] = new Array(union.size);
        let j = 0;
        for(let el of union){
            

            if(lines[i].has(el)) vectorsMatrix[i][j] = 1;
            else vectorsMatrix[i][j] = 0;

            j++;
        }
    }

    return vectorsMatrix;
}


function getRandomArray(arrayLength){
    const arr = new Array(arrayLength);

    for(let i = 0; i < arrayLength; i++){
        arr[i] = i;
    }

    for(let i = 0; i < arrayLength; i++){
        let swapIndex = Math.floor(Math.random() * (arrayLength - i));

        //swap
        let temp = arr[i];
        arr[i] = arr[swapIndex + i];
        arr[swapIndex + i] = temp;
    }

    return arr;
}
module.exports = {
    getShinglesByChars,
    getShinglesByWords,
    getVectors,
    getRandomArray
};