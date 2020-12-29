const txtgen = require('txtgen');
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


const content = produceContent("sentence", 10000);
writeContentToFile("./../assets/data/sentences10000.js", content);
// const paragraph = txtgen.paragraph();
// console.log(paragraph);
 
// const article = txtgen.article();
// console.log(article);