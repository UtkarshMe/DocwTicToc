fs = require('fs');
var Teams = require('./models/team.js');

module.exports = function(app, passport){

    app.get('/api/users/', isAdmin, function(req, res){
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


    app.get('/api/news', isLoggedIn, function(req, res){
        var News = require('./models/news.js');
        var news = new News();
        res.send(news.getUnreadNumber(0));
    });
    

    app.post('/api/set/status/:status/:username', isAdmin, function(req, res){
        var query = { 'local.username': req.params.username };
        var update = {
            $set: {'local.status': req.params.status}
        };
        var opts = { strict: false };

        Teams.update(query, update, opts, function (err) {
            if (err) {
                res.send('error');
            } else {
                res.send('done');
            }
        });
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
