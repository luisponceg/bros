const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const pool = (require('../database'));
const helpers = require('../lib/helpers');


passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},async (req, username, password, done) => {

    pool.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (results.length > 0) {
            const userPass= results[0].password;
            const user = results[0];
            console.log('Password:', userPass);
            const validPassword =  await helpers.matchPassword(password, userPass);
            console.log(validPassword);
            if (validPassword) {
                console.log('Contraseña valida');
                console.log(validPassword);
                return done(null, user, req.flash('SUCCESS', 'Bienvenido'));
            } else {
                console.log('Contraseña invalida');
                return done(null, false, req.flash('message', 'Contraseña incorrecta'));
            }
          } else {
            return done(null, false, req.flash('message', 'Nombre de usuario incorrecto'));
          } });
 
   


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