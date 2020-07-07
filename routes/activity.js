var express = require('express');
var router = express.Router();
const path = require('path');

let activityList = [];

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Ok');
});

router.post('/', (req,res)=>{
    const {activity, time} = req.body; 
    activityList = [...activityList, {
        activity,
        time: time
    }];
    res.sendStatus(200);
})

setInterval(()=>{
    const time = new Date();
      
    if(time.getMinutes() === 0){
        const fileName = `${time.getFullYear()}_${time.getMonth()+1}_${time.getDate()}_${time.getHours()}_${time.getMinutes()}.json`;
        const baseDir = path.parse(__dirname)
        const url = path.join(baseDir.dir, 'data', 'activity', fileName);
        fs.writeFileSync(url, JSON.stringify(activityList));
        activityList = [];
    }
            
}, 1000*60);

module.exports = router;
