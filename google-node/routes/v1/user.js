
let router = require('express').Router();
let authenticationService = require('../../services/v1/authentication.services');

router.post('/getUserPeoples', authenticationService.getUserPeoples);
router.post('/addEventInvitation', authenticationService.eventInvitation);

module.exports = router;
