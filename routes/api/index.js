const router = require('express').Router();
const reaction = require('./reactionRoutes');
const thought = require('./thoughtRoutes');
const user = require('./userRoutes');

router.use('/Reactions', reaction);
router.use('/Thoughts', thought);
router.use('/Users', user);

module.exports = router;