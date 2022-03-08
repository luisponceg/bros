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
                return done(null, user, req.flash('success', 'Bienvenido'));
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
        pool.query('INSERT INTO USERS SET ?  ', [newUser], function (error, results, fields) {
            if (error) throw error;
            newUser.id = results.insertId;
            console.log('-------------------');
            console.log(results);
            return done(null, newUser);
        });
           

    }));




passport.serializeUser((user, done) => {
    console.log('---serializeUser---:' , user.id);
    done(null, user.id);
});


passport.deserializeUser((id, done) => {
    console.log('id:' , id);
    const rows = pool.query('SELECT * FROM users WHERE id =  ?  ', [id], function (error, results, fields) {
        if (error) throw error;
        newUser.id = results.insertId;
        console.log('---deserializeUser---:' , rows[0].id);
        return done(null, rows[0]);
    });
});