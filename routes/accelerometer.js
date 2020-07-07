var express = require('express');
var router = express.Router();
const path = require('path');

let accList = [];

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Ok');
});

router.post('/', (req,res)=>{
    const {accelerometer, gyroscope, userAccelerometer, time} = req.body; 
    accList = [...accList, {
        accelerometer, gyroscope, userAccelerometer,
        time: time
    }];
    res.sendStatus(200);
})

setInterval(()=>{
    const time = new Date();
      
    if(time.getMinutes() === 0){
        const fileName = `${time.getFullYear()}_${time.getMonth()+1}_${time.getDate()}_${time.getHours()}_${time.getMinutes()}.json`;
        const baseDir = path.parse(__dirname)
        const url = path.join(baseDir.dir, 'data', 'acc', fileName);
        fs.writeFileSync(url, JSON.stringify(accList));
        accList = [];
    }
            
}, 1000*60);

module.exports = router;
