
const express = require('express');
const router = express.Router();


router.get('/',(req,res) => {
    //  res.sendFile(path.join(__dirname, 'views/index.html'));
    // console.log(__dirname + 'views/index.html');
    // console.log(path.join(__dirname + 'views/index.html'));
    res.render('index.html',{title:'First Website'});
    
});
router.get('/contact',(req,res) => {
   
    res.render('contact.html',{title:'contact Page'});
    
});
module.exports = router;