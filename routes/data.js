var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', function(req, res) {
    const baseDir = path.parse(__dirname)
    const url = path.join(baseDir.dir, 'data', 'general');

    let data = [];
    fs.readdirSync(url).forEach((file)=>{ 
        console.log(file)
        const buf = fs.readFileSync(url+'/'+file);
        data = data.concat(JSON.parse(buf.toString()));
    });
    res.send(data);
});

module.exports = router;
