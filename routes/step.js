var express = require('express');
var router = express.Router();
const path = require('path');

const fs = require('fs');

let stepList = [];

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Ok');
});

router.post('/', (req,res)=>{
    const {step, time} = req.body; 
    
    // stepList = [...stepList, {
    //     step: parseInt(step),
    //     time: time
    // }];
    stepList = stepList.concat({
        step: parseInt(step),
        time: time
    })
    console.log(stepList);
    res.sendStatus(200);
})

setInterval(()=>{
    const time = new Date();
      
    if(time.getMinutes() % 5 === 0){
        const fileName = `${time.getFullYear()}_${time.getMonth()+1}_${time.getDate()}_${time.getHours()}_${time.getMinutes()}.json`;
        const baseDir = path.parse(__dirname)
        const url = path.join(baseDir.dir, 'data', 'step', fileName);
        fs.writeFileSync(url, JSON.stringify(stepList));
        stepList = [];
    }
}, 1000*30);

module.exports = router;
