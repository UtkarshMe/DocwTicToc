module.exports = function (app, passport) {
    
    app.get('/', function (req, res) {
        res.render('views/index.ejs');
    });

    app.get('/login', function (req, res) {
        res.render('views/login.ejs');
    });

    app.get('/signup', function (req, res) {
        res.render('views/signup.ejs');
    });

    app.get('/profile', authenticate, function (req, res) {
        res.render('views/profile.ejs', {
            user: req.user
        });
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
}

function authenticate(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}
