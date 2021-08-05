module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Por favor registrate para ver este contenido.');
        res.redirect('/users/login')
    }
}