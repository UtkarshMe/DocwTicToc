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
