const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')

const app = express()
const PORT = process.env.PORT || 5000;


//pasport config
require('./config/passport')(passport)

//DB CONFIG
const db = require('./config/keys').MongoURI;
// CONNECT TO MONGOOSE
mongoose.connect(db, {useNewUrlParser: true})
.then(() => console.log('Mongodb Connected'))
.catch(err => console.log(err));

//EJS
app.set('view engine', 'ejs');

//BODYPARSER
app.use(express.urlencoded({ extended: false }))

//viewa
app.use(express.static(__dirname + '/views'));

//Express session middle ware
app.use(session({
    secret: 'secrete',
    resave: true,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
//Connect Flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//ROUTES
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));




app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`)
})

