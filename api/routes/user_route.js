const controllers = require('../controllers/user_controller');

var router = require('express').Router();


router.route('/')
    .get(controllers.list_all_users)
    .post(controllers.create_a_user);


router.route('/:usernameString')
    .get(controllers.read_a_task_by_username)
    .put(controllers.update_a_user);


module.exports = router;