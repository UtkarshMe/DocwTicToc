module.exports = function(app, passport){

    app.get('/api/users/', isAdmin, function(req, res){
        var Teams = require('./models/team.js');
        Teams.find({}, function(err, teams){

            if (err) {
                throw err;
            }else{
                var content = [];
                teams.forEach(function (team) {
                    content.push(team.local);
                });
                res.send(JSON.stringify(content));
            }
        });
    });
}


function isLoggedIn(req, res) {
    if (req.authenticated()) {
        return next();
    }
    res.send();
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.local.username == "admin") {
        return next();
    }
    res.send();
}
