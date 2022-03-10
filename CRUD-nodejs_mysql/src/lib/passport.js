const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


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
        
            const validPassword =  await helpers.matchPassword(password, userPass);
           
            if (validPassword) {
                console.log('Contraseña valida');
                console.log(validPassword);
                return done(null, user, req.flash('success', 'Bienvenido  '+  user.username));
            } else {
                console.log('Contraseña invalida');
                return done(null, false, req.flash('message', 'Contraseña incorrecta'));
            }
          } else {
            return done(null, false, req.flash('message', 'Nombre de usuario incorrecto'));
          } });
          console.log('user--->',user);
       


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
    console.log(user);
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    console.log('[passport]deserializeUser');
  pool.query("select * from users where id = ? ",[id],function(err,rows){	
    if(err){console.log(err);}else{
        if(rows.length!=0){done(err,rows[0])}
        else{done(err,null);}
    }    
    });
});