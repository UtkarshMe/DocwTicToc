var fs = require('fs');

module.exports = function (app, passport) {

    var appData = JSON.parse(fs.readFileSync('./config/appData.json'));
    
    // Handle GET requests
    
    app.get('/', function (req, res) {
        res.render('index.ejs', appData);
    });

    app.get('/login', function (req, res) {
        res.render('login.ejs', { message: "Put a message in me" });
    });

    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: "Put a message in me"});
    });

    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user
        });
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });



    // Handle POST requests

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login?failed',
    }));

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup?failed',
    }));
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}
