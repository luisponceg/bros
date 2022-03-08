const express =require('express');
const morgan =require('morgan')
const {engine}= require('express-handlebars')
const path = require ('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const {database} = require('./keys');
 
//Iniciamos
const app = express();
require('./lib/passport');
//settings
app.set('port',process.env.PORT||4000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs',engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine','.hbs');
//middewares
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: 'luissesion',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(passport.initialize());
passport.use(passport.session());
//Global variables
app.use((req,res,next)=>{
    app.locals.success = req.flash('SUCCESS');
    next();
});
 
//routes
app.use(require('./routes'));
app.use(require('./routes/authentication'))
app.use('/links', require('./routes/links'))

//public 
app.use(express.static(path.join(__dirname,'public')));

//starting tthe server
app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'))
});
 