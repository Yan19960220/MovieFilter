const controllers = require('../controllers/movie_controller');

var router = require('express').Router();

router.get('/', function(req, res){
    res.json({
        status: 'API works',
        message: 'Welcome to the API'
    });
});

router.route('/movies')
    .get(controllers.list_all_movies)
    .put(controllers.create_a_movie);


router.route('/movies/:titleString')
    .get(controllers.read_a_task_by_title)
    .put(controllers.update_a_movie);


module.exports = router;