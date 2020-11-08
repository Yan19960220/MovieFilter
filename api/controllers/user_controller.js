var mongoose = require('mongoose');
var User = require('../models/user')

function isEmpty(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}

exports.list_all_users = function(req, res) {
    let username = req.query.n;
    let password = req.query.p;
    if(!isEmpty(year)){
        User.find({Username: username, Password: password}, function(err, user){
            if(err)
                res.send(err);
            res.json({
                status: "success",
                message: "Got Successfully!",
                data: user
            });
        });
    }else{
        User.find({Username: username}, function(err, user){
            if(err)
                res.send(err);
            res.json({
                status: "success",
                message: "Got Successfully!",
                data: user
            });
        });
    }
};

exports.create_a_user = function(req, res){
    User.find({Username: req.query.Username}, function(err, result){
        if (err) 
            res.send(err);
        if(result){
            console.log('Has existed!')
            res.json({
                message: 'User Details',
                data: result
            });
        }
        else{
            var new_user = new User(req.body);
            new_user.save(function(err, user){
                if(err)
                    res.send(err);
                res.json({
                    message: "New user Added!",
                    data: user
                });
            });
        }
        res.render('login');
    });
};

exports.read_a_task = function(req, res){
    User.findById(req.params.userId, function(err, user){
        if(err)
            res.send(err);
        res.json({
            message: 'User Details',
            data: user
        });
    });
};

exports.read_a_task_by_username = function(req, res){
    var username = req.params.usernameString;
    console.log(username)
    User.find({Username: username}, function(err, result){
        if (err) 
            res.send(err);
        res.json({
            message: 'User Details',
            data: result
        });
    });
};

exports.update_a_user = function(req, res){
    var username = req.params.usernameString;
    User.findOneAndUpdate({ Username: username }, req.body, {new: true}, function(err, user){
        if(err)
            res.send(err);
        res.json(user);
    });
};

exports.delete_a_user = function(req, res){
    User.remove({
        _id: req.params.userId
    }, function(err, user){
        if(err)
            res.send(err);
        res.json({ message: 'User successfully deleted' });
    });
};