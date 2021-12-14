var mailSender = require('../mailService/index');
var bcrypt = require('bcryptjs');

exports.passwordEmail = async function(req,res){
    var email = req.params.email;    
    var mail = {
        to: email,
        subject: "Reset your password",
        text: "Reset your pasword by using the below link."+'<p>Click <a href="https://www.google.com/' + '">here</a> to reset your password</p>',
    }
    mailSender.sendMail(mail)
}

exports.forgotPassword = async function (req, res) {
    try {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                await userDetails.update({password: hash },{ email: req.body.email }).then(data => {
                    res.status(200).json({
                        message: "User saved successfully",
                    });
                });
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
           