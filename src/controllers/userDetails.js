var user = require('../models/user');
var bcrypt = require('bcryptjs');

exports.userRegister = function (req, res) {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        } else {
            const userDetails = {
                userName: req.body.userName,
                password: hash,
                email: req.body.email,
                updatedAt: Date.now(),
                createdAt: Date.now()
            };
           await user.create(userDetails).then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating"
                    });
                });
        }
    });
}

exports.login = async function(req,res){
    try {
        await user.findAll({where:{email: req.body.email}}).then(data =>{
            bcrypt.compare(req.body.password, data[0].password,(err, bcryptRes) => {
                    //if any error in bcryption 
                    if (err) {
                        return res.status(401).json({
                            message: 'password doesn\'t match',
                            error: err.message,
                            status: 401
                        });
                    }
                    if (bcryptRes == true) {    
                        return res.status(200).json({
                            message: 'Login successfull',
                            status: 200
                        });
                    }
                    else if (bcryptRes == false) {
                        return res.status(401).json({
                            message: 'Wrong password please try again',
                            status: 401
                        });
                    }
                })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while login"
            });
        });
        
    } catch (error) {
        
        res.status(500).send({
            message: error.message
        });
    }
    
}