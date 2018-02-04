const router = require('express').Router();

/**
 * Set of routes related to user management
 */
router.use('/users', require('./users'));

router.use('/volume', require('./volume'));

/**
 *  Set of routes used for testing
 */
router.get('/', (req, res) => {
  res.status(200);
  res.json({'message': 'Hello World!'});
});




module.exports = router