const express = require('express');
const router = express.Router();
const {
    createNewUser,
    deleteUser,
    getAllUsers,
} = require('../services/userService');

router
    .route('/')

    .get((req, res) => {
        getAllUsers(res);
    })

    .post((req, res) => {
        createNewUser(req, res);
    })

    .delete((req, res) => {
        deleteUser(req, res);
    });

module.exports = router;
