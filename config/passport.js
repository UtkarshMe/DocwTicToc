//
// Configuration file for passportJS
//

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');


module.exports = function(passport){

    // Specify a local strategy for passport
    passport.use(new LocalStrategy(
        
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },

        function(email, password, done){
            User.findOne({'local.email': email }, function(err, user){

                if (err) {
                    return done(err);
                }
                
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect username'
                    });
                }
                
                if (!user.validPassword(password)) {
                    return done(null, false, {
                        message: 'Incorrect password'
                    });
                }

                return done(null, user);
            });
        }
    ));


    // Specify serialize and deserialize methods for passport
    passport.serializeUser(function(user, done){
        
        // Can use tokens in the future
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        
        // retrieve user from the info
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

};
