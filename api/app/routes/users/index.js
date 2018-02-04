const router = require('express').Router();

/**
 * Extract the userId and adds to the req body
 */
router.param('userId', (req, res, next, id) => {
  req.userId = id;
  next();
});

/**
 *  Set of routes used for testing
 */
router.get('/db', (req, res) => {
  const db = req.app.get('db');
  db.connect(function(err) {
    if (err) {
      console.log('Error in connecting');
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    res.status(200);
    res.json('Connected to database.');
  });
});

router.post('/login', (req, res) => {
  const db = req.app.get('db');
  const sql = 'SELECT * FROM users where email = ? AND password = ?';
  db.query(sql, [req.body.email, req.body.password], (err, rv) => {
    if (rv.length > 0) {
      res.status(200);
      res.json({message: 'Logged In Successfully',
                id: rv[0].id});
    }
    else {
      res.status(401);
      res.json({error: 'Unauthorized'});
    }
  });
})

router.use('/:userId', require('./usersDetail'));

router.get('/', (req, res) => {
  const db = req.app.get('db');
  const sql = 'SELECT * FROM users ORDER BY id ASC';
  db.query(sql, (err, rv) => {
    res.status(200);
    res.json(rv);
  });
})

router.post('/', (req, res) => {
  const db = req.app.get('db');
  const sql = 'INSERT INTO users SET ?';
  db.query(sql, {email: req.body.email, password: req.body.password}, (err, rv) => {
    if (err) throw err;
    res.status(201);
    res.json(rv.affectedRows + ' user created');
  });
});

module.exports = router
