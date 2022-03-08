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
    const rows =  pool.query('SELECT * FROM users WHERE username = ?  ', [username], function (error, results, fields) {
      if(rows.length > 0){
          const user = rows [0];
          const validPassword = helpers.matchPassword(password,user.Password);
          if (validPassword){
              done(null,user,req.flash('success','Bienvenido'));
          }else{
              done(null,false,req.flash('message','Contraseña incorrecta'));
          }
      } else{
          return done(null,false,req.flash('message','No existe el usuario'));
      }

    });

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