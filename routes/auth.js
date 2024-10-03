const express = require('express');

const router = express.Router();
const authController = require('../controllers/feed');
const { body } = require('express-validator/check');

router.put('signup/', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req })=>{
            return UserActivation.findOne({email: value}).then(userDoc => {
                if(userDoc) {
                    return Promise.reject('E-mail address already exist!');
                }
            })
        })
    .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 5}),
    body('name')
        .trim()
        .not()
        .isEmpty()
],
authController.signup);


module.exports = router;