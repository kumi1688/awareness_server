var express = require('express');
var router = express.Router();
const path = require('path');

const fs = require('fs');

router.get('/', function(req, res) {
    res.render('map.html');
});

router.post('/', (req,res)=>{
    console.log(req.body);
    res.sendStatus(200);
})

module.exports = router;