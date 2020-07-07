var express = require('express');
var router = express.Router();
const path = require('path');

const fs = require('fs');

let locationList = [];

/* GET home page. */
router.get('/', function(req, res, next) {
    const locations = [{"latitude":37.4017817,"longitude":126.91968,"time":"2020-07-07 06:49:34.716924"},{"latitude":37.3057167,"longitude":126.851015,"time":"2020-07-07 06:49:35.813762"},{"latitude":37.33848,"longitude":126.7850983,"time":"2020-07-07 06:49:37.863666"}];
    res.render('map.html', {locations:locations});
});

router.post('/', (req,res)=>{
    const {latitude, longitude, time} = req.body; 
    locationList = [...locationList, {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        time: time
    }];
    console.log(locationList);
    res.sendStatus(200);
})

setInterval(()=>{
    const time = new Date();
      
    if(time.getMinutes() === 0){
        const fileName = `${time.getFullYear()}_${time.getMonth()+1}_${time.getDate()}_${time.getHours()}_${time.getMinutes()}.json`;
        const baseDir = path.parse(__dirname)
        const url = path.join(baseDir.dir, 'data', 'location', fileName);
        fs.writeFileSync(url, JSON.stringify(locationList));
        locationList = [];
    }
            
}, 1000);

module.exports = router;
