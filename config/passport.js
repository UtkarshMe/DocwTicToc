//
// Configuration file for passportJS
//

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');


module.exports = function(passport){

    // Specify a local strategy for passport login
    passport.use('local-login', new LocalStrategy(
        
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },

        function(req, email, password, done){
            User.findOne({'local.email': email }, function(err, user){

                if (err) {
                    return done(err);
                }
                
                if (!user) {
                    // User not found
                    return done(null, false);
                }
                
                if (!user.validPassword(password)) {
                    // Wrong password
                    return done(null, false);
                }

                return done(null, user);
            });
        }
    ));


    // Specify a local strategy for passport logout
    passport.use('local-signup', new LocalStrategy(
        
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },

        function(req, email, password, done){
            User.findOne({'local.email': email }, function(err, user){

                User.findOne({'local.email': email}, function(err, user){

                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        // User already registered
                        return done(null, false);
                    }
                    else{

                        var newUser = new User();
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);

                        newUser.save(function(err){
                            if (err) {
                                throw err;
                            }
                                return done(null, newUser);
                        });
                    }
                });
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
