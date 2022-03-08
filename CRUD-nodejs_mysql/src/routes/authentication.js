const express = require('express')
const router = express.Router();

const passport = require('../lib/passport');

router.get('/signup',(req,res)=>{
    res.render('auth/signup')
})

router.post('/signup',passport.authenticate('local.signup',{
        successRedirect: '/profile',
        failureRedirect:'/signup',
        failureFlash: true
}));
router.get('/signin',(req,res)=>{
    res.render('auth/signin');
});
router.get('/profile', (req,res)=>{
    res.send('Este es tu perfil');
});
router.post('/signin',passport.authenticate('local.signin',{
        successRedirect:'/profile',
        failureRedirect:'/signin',
        failureFlash: true

}));

module.exports = router;