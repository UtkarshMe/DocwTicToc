fs = require('fs');
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

    app.get('/api/leaderboard/', isLoggedIn, function(req, res){
        var Teams = require('./models/team.js');
        var query = Teams.find({});

        query.select('local.username local.game.score');

        query.exec(function(err, teams){

            if (err) {
                throw err;
            }else{
                var content = [];
                teams.forEach(function (team) {
                    if (team.local.username != 'admin')
                        content.push(team.local);
                });
                content.sort(function(a, b){
                    return a.game.score - b.game.score;
                });
                res.send(JSON.stringify(content));
            }
        });
    });

    
    app.get('/api/question/', isLoggedIn, function(req, res){

        var Game = JSON.parse(fs.readFileSync('./config/questions.json'));
        var content = [];
        content.push(Game[req.user.local.game.level].question);
        res.send(JSON.stringify(content));
    });
}


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
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
