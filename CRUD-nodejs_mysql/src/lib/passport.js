const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const pool = (require('../database'));
const helpers = require('../lib/helpers');


passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    console.log(req.body);
    const rows = await pool.query('SELECT PASSWORD FROM users WHERE username = ?  ', [username], function (error, results, fields) {
        if (error) throw error;

        const user = rows;
        console.log(user);

    });
    // console.log('--------vamos a comparar------');
    // console.log(password);
    // console.log(user.password);
    // const validPassword = bcrypt.compare(password, user.password, function(err, result) {

    //     if ( validPassword) {
    //         done(null,user,req.flash('Bienvenido' + user.name));
    //     }else{
    //         done(null,user,req.flash('Contraseña incorrecta'));

    //     }
    // });        

}));






passport.use('local.signup', new LocalStrategy({ usernameField: 'username', passwordField: 'password', passReqToCallback: true },
   async  (req, username, password, done) => {
        const { fullname } = req.body;
        const newUser = {
           
            fullname,
            password,
            username

        };
       
        newUser.password = await helpers.encryptPassword(password);
        const results = pool.query('INSERT INTO USERS SET ?  ', [newUser], function (error, results, fields) {
            if (error) throw error;
            newUser.id = results.insertId;
            console.log('-------------------');
            console.log(results);
            return done(null, newUser);
        });
           

    }));




passport.serializeUser((user, done) => {

    done(null, user.id);
});


passport.deserializeUser(async(id, done) => {

    const rows = pool.query('SELECT * FROM USERS WHERE id =  ?  ', [id], function (error, results, fields) {
        if (error) throw error;
        newUser.id = results.insertId;
        return done(null, rows[0]);
    });
});