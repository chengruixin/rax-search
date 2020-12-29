const txtgen = require('txtgen');
const randomWords = require("random-words");
const {writeContentToFile} = require("./fileReader");
// const sentence = txtgen.sentence();
// console.log(sentence);

function produceContent(contentType, contentLength){
    if(!contentType || !contentLength) throw new Error("params must present");

    let content = 'const text = [';

    for(let i = 0; i < contentLength; i ++){
        let newContent = '';
        if(contentType === 'sentence'){
            newContent = txtgen.sentence();
        }

        if(i !== contentLength - 1) content += `"${newContent}",`;
        else content += `"${newContent}"];`;
    }

    content += "module.exports = text;";

    return content;
}

function produceContentByArray(array){
    let content = 'const text = ';
    content += JSON.stringify(array);
    content += ";module.exports = text;";
    return content;
}


const content =produceContent("sentence", 100000);
writeContentToFile("./../assets/data/sentences100000.js",content);