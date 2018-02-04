const router = require('express').Router();

router.get('/', (req, res) => {
  const db = req.app.get('db');
  const sql = 'SELECT * FROM jobs ORDER BY id ASC';
  db.query(sql, (err, rv) => {
    res.status(200);
    res.json(rv);
  });
});

router.post('/', (req, res) => {
  const db = req.app.get('db');
  const sql = 'INSERT INTO jobs SET ?';
  const job = {
    jobID: req.body.jobID,
    status: 'pending'
  };
  db.query(sql, job, (err, rv) => {
    if (err) throw err;
    res.status(201);
    res.json(rv.affectedRows + ' job created');
  });
});

module.exports = router
