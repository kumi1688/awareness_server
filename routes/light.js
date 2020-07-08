var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');

let lightList = [];

router.get('/', function(req, res) {
    res.send('Ok');
});

router.post('/', (req,res)=>{
    const {light, time} = req.body; 
    lightList = lightList.concat({
        light: light,
        time: time
    })
    res.sendStatus(200);
})

setInterval(()=>{
    const time = new Date();
    if(time.getMinutes() % 5 === 0){
        const fileName = `${time.getFullYear()}_${time.getMonth()+1}_${time.getDate()}_${time.getHours()}_${time.getMinutes()}.json`;
        const baseDir = path.parse(__dirname)
        const url = path.join(baseDir.dir, 'data', 'light', fileName);
        fs.writeFileSync(url, JSON.stringify(lightList));
        lightList = [];
    }
}, 1000*30);

module.exports = router;
