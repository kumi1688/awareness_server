var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');

let generalDataList = [];

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Ok');
});

router.post('/', (req,res)=>{    
    const {step, latitude, longitude, activity, time, light} = req.body; 
    generalDataList = generalDataList.concat({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        step: parseInt(step),
        light: parseInt(light),
        activity: activity,
        time: time
    })
    res.sendStatus(200);
})

function writeData(){
    const time = new Date();
    const fileName = `${time.getFullYear()}_${time.getMonth()+1}_${time.getDate()}_${time.getHours()}_${time.getMinutes()}.json`;
    const baseDir = path.parse(__dirname)
    const url = path.join(baseDir.dir, 'data', 'general', fileName);
    fs.writeFileSync(url, JSON.stringify(generalDataList));
    generalDataList = [];
}

setInterval(()=>{
    const time = new Date();      
    const fileName = `${time.getFullYear()}_${time.getMonth()+1}_${time.getDate()}_${time.getHours()}_${time.getMinutes()}.json`;
    const baseDir = path.parse(__dirname)
    const url = path.join(baseDir.dir, 'data', 'general', fileName);
    
    if(time.getMinutes() % 5 === 0 && !fs.existsSync(url)){
        fs.writeFileSync(url, JSON.stringify(generalDataList));
        generalDataList = [];
    } 
}, 1000*30);

module.exports = router;
