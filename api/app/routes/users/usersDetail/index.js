const router = require('express').Router();

router.delete('/', (req, res) => {
  const db = req.app.get('db');
  const sql = 'DELETE FROM users WHERE id = \'' + req.userId + '\'';
  db.query(sql, (err, res) => {
    if (err) throw err;
    res.status(204);
    res.json(req.userId + ' was successfully deleted');
  });
});


module.exports = router
