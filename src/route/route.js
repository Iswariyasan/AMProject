var user = require('../controllers/userDetails');
var password = require('../controllers/password');

exports.route = function(app){
    app.route('/createUser').post(user.userRegister);
    app.route('/login').get(user.login);
    app.route('/forgotPassword').post(password.forgotPassword);
    app.route('/passwordEmail/:email').get(password.passwordEmail);
}