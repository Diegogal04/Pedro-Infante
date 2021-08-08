const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

//login page
router.get('/', (req, res) => {
    res.render('login')
})

//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
res.render('index.ejs', {
    name: req.user.name
}))

router.get('/logline', ensureAuthenticated, (req, res) => {
    res.render('logline.ejs')
})

router.get('/teaser', ensureAuthenticated, (req, res) => {
    res.render('teaser.ejs')
})

router.get('/sinopsis', ensureAuthenticated, (req, res) => {
    res.render('sinopsis.ejs')
})

router.get('/pedro', ensureAuthenticated, (req, res) => {
    res.render('pedro.ejs')
})

router.get('/equipo', ensureAuthenticated, (req, res) => {
    res.render('equipo.ejs')
})

router.get('/contenido', ensureAuthenticated, (req, res) => {
    res.render('contenido.ejs')
})

router.get('/capitulos', ensureAuthenticated, (req, res) => {
    res.render('capitulos.ejs')
})

router.get('/capitulos/episodio-1', ensureAuthenticated, (req, res) => {
    res.render('ep1.ejs')
})

router.get('/capitulos/episodio-2', ensureAuthenticated, (req, res) => {
    res.render('ep2.ejs')
})

router.get('/capitulos/episodio-3', ensureAuthenticated, (req, res) => {
    res.render('ep3.ejs')
})

router.get('/capitulos/episodio-4', ensureAuthenticated, (req, res) => {
    res.render('ep4.ejs')
})

router.get('/capitulos/episodio-5', ensureAuthenticated, (req, res) => {
    res.render('ep5.ejs')
})

router.get('/capitulos/episodio-6', ensureAuthenticated, (req, res) => {
    res.render('ep6.ejs')
})

router.get('/capitulos/episodio-7', ensureAuthenticated, (req, res) => {
    res.render('ep7.ejs')
})






module.exports = router;