var express = require('express');
var router = express.Router();
const path = require('path');

const fs = require('fs');

let locationList = [];

router.get('/', function(req, res) {
    res.render('map.html');
});

router.post('/', (req,res)=>{
    const {latitude, longitude, time} = req.body; 
    
    locationList = locationList.concat({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        time: time
    })
    
    res.sendStatus(200);
})

setInterval(()=>{
    const time = new Date();
      
    if(time.getMinutes() % 5 === 0){
        const fileName = `${time.getFullYear()}_${time.getMonth()+1}_${time.getDate()}_${time.getHours()}_${time.getMinutes()}.json`;
        const baseDir = path.parse(__dirname)
        const url = path.join(baseDir.dir, 'data', 'location', fileName);
        fs.writeFileSync(url, JSON.stringify(locationList));
        locationList = [];
    }    
}, 1000 * 30);

module.exports = router;
