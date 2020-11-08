var mongoose = require('mongoose');
var Movie = require('../models/movie')

function isEmpty(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}

exports.list_all_movies = function(req, res) {
    let title = req.query.t;
    let year = req.query.y;
    if(!isEmpty(year)){
        Movie.find({Title: title, Year: year}, function(err, movie){
            if(err)
                res.send(err);
            res.json({
                status: "success",
                message: "Got Successfully!",
                data: movie
            });
        });
    }else{
        Movie.find({Title: title}, function(err, movie){
            if(err)
                res.send(err);
            res.json({
                status: "success",
                message: "Got Successfully!",
                data: movie
            });
        });
    }
};

exports.create_a_movie = function(req, res){
    Movie.find({Title: req.query.Title}, function(err, result){
        if (err) 
            res.send(err);
        if(result){
            console.log('Has existed!')
            res.json({
                message: 'Movie Details',
                data: result
            });
        }
        else{
            var new_movie = new Movie(req.body);
            new_movie.save(function(err, movie){
                if(err)
                    res.send(err);
                res.json({
                    message: "New movie Added!",
                    data: movie
                });
            });
        }
    });
};

exports.read_a_task = function(req, res){
    Movie.findById(req.params.movieId, function(err, movie){
        if(err)
            res.send(err);
        res.json({
            message: 'Movie Details',
            data: movie
        });
    });
};

exports.read_a_task_by_title = function(req, res){
    var title = req.params.titleString;
    console.log(title)
    Movie.find({Title: title}, function(err, result){
        if (err) 
            res.send(err);
        res.json({
            message: 'Movie Details',
            data: result
        });
    });
};

exports.update_a_movie = function(req, res){
    var title = req.params.titleString;
    Movie.findOneAndUpdate({ Title: title }, req.body, {new: true}, function(err, movie){
        if(err)
            res.send(err);
        res.json(movie);
    });
};

exports.delete_a_movie = function(req, res){
    Movie.remove({
        _id: req.params.movieId
    }, function(err, movie){
        if(err)
            res.send(err);
        res.json({ message: 'Movie successfully deleted' });
    });
};