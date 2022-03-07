const express = require('express')
const router = express.Router();

const passport = require('passport');

router.get('/singup',(req,res)=>{
    res.render('auth/singup')
})
// router.post('/singup',(req,res)=>{
//    passport.authenticate('local.singup',{
//        successRedirect: '/profile',
//        failureRedirect:'/singup',
//        failureFlash: true
//    })
//     res.send('recibido');
// });
router.post('/singup',passport.authenticate('local.singup',{
    successRedirect: '/profile',
        failureRedirect:'/singup',
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