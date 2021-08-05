const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Users model
const User = require('../models/User')

//Login Page
router.get('/login', (req, res) => {
    res.render('login')
});

//Register Page
router.get('/register', (req, res) => {
    res.render('register')
})

// REGISTER POST HANDLER
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if(!name || !email || !password || !password2) {
        errors.push({ msg: "Por favor llena todos los campos" })
    };

    if(password !== password2) {
        errors.push({ msg: "Las contraseñas no coinciden" })
    }

    if(password.length < 6) {
        errors.push({ msg: "La contraseña debe de tener 6 caracteres" })
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        //VALIDATION PASS
        User.findOne({ email: email })
        .then(user => {
            if(user) {
                errors.push({ msg: "¡Este mail ya esta registrado!" })
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => {
                        req.flash('success_msg', '¡Ya tienes acceso!');
                        res.redirect('/users/login');
                    })
                    .catch(err => console.log(err))
                }))
                
            }
        })
    }
});

//login handler
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//log out handdle
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', 'Session cerrada con exito')
    res.redirect('/users/login')
})


module.exports = router;