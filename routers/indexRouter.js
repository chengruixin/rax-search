const router = require("express").Router();
const storedData = require("../data/test");
const {KmpReturnBoolean} = require("../searchingAlgo/PatternFinder");
const fuzzyMatch = require("../searchingAlgo/fuzzyMatch");
router.get('/', (req, res)=>{
    
    try{
        let {search : pattern} = req.query;

        if(!storedData || !pattern) {
            res.status(500).send("no data stored!");
            return;
        }
        console.time('resqueted');

        pattern = pattern.toLowerCase();
        const exactResult = [];
        const fuzzyMatchings = [];
        for(let i = 0; i <storedData.length; i++){
            let compared = storedData[i].toLowerCase();
            if(KmpReturnBoolean(compared, pattern)){
                exactResult.push(storedData[i]);
            }
            else{

                let value = fuzzyMatch(compared, pattern);
                if(value <= pattern.length * 2){
                    fuzzyMatchings.push({
                        string : storedData[i],
                        value : value
                    })
                }
            }
        }

        fuzzyMatchings.sort((obj1, obj2)=> {
            return obj1.value < obj2.value;
        });
        
        const exact = [];
        const fuzzy = [];
        for(let i = 0; i < exactResult.length && i < 5; i++){
            exact.push(exactResult[i]);
        }
        for(let i = 0; i < fuzzyMatchings.length && i < 5; i++){
            fuzzy.push(fuzzyMatchings[i].string +  " @" + fuzzyMatchings[i].value);
        }

        console.timeEnd('resqueted');
        res.json({
            exact,
            fuzzy
        })
    }
    catch(err){
        console.error(err);
        res.status(500).send(err);
    }
    



})


module.exports = router;