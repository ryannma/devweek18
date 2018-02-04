const router = require('express').Router();
const request = require('request-promise');

router.get('/refresh', (req, res) => {
  const db = req.app.get('db');
  const sql = 'SELECT * FROM jobs WHERE status=\'pending\'';
  db.query(sql, (err, rv) => {
    rv.map(row => {
      const jobID = JSON.parse(JSON.stringify(row)).jobID;
      const options = {
        method: 'POST',
        uri: 'https://api.veritone.com/v3/graphql',
        body: JSON.stringify({
          query: "query { job(id: \"" + jobID + "\") { status tasks { records { id engineId status } } } }"
        }),
        headers: {
          Authorization: 'Bearer 23ff3a:c04594f5024a4b949b966e91caf7ae55aa5695c3be754bb888d064e73b490f10',
          'Content-Type': 'application/json'
        }
      }
      request(options)
        .then(data => {
          const status = JSON.parse(data).data.job.status
          const updateSql = 'UPDATE jobs SET status=\'' + status + '\' WHERE jobID = \'' + jobID + '\'';
          db.query(updateSql, (err, rv) => {
            if (err) throw err;
            console.log(rv);
          });
        });
    });
    res.status(200);
    res.json({message: 'Refreshing status...'});
  });
});

router.get('/update', (req, res) => {
  const db = req.app.get('db');
  const sql = 'SELECT * FROM jobs WHERE status = \'complete\' AND result is null';
  db.query(sql, (err, rv) => {
    rv.map(row => {
      const tdoID = JSON.parse(JSON.stringify(row)).tdoID;
      const options = {
        method: 'POST',
        uri: 'https://api.veritone.com/v3/graphql',
        body: JSON.stringify({
          query: "query { temporalDataObject(id: \"" + tdoID + "\") { assets { records { assetType signedUri sourceData { taskId engineId } } } } }"
        }),
        headers: {
          Authorization: 'Bearer 23ff3a:c04594f5024a4b949b966e91caf7ae55aa5695c3be754bb888d064e73b490f10',
          'Content-Type': 'application/json'
        }
      }
      request(options)
        .then(data => {
          const transcript = JSON.parse(data).data.temporalDataObject.assets.records[1].signedUri;
          console.log(transcript);
          const updateSql = 'UPDATE jobs SET result = ? WHERE tdoID = \'' + tdoID + '\'';
          db.query(updateSql, [transcript], (err,rv) => {
          });
        });
    });
    res.status(200);
    res.json({message: 'Updating results...'});
  })
})

var options = {
    method: 'POST',
    uri: 'http://api.posttestserver.com/post',
    body: {
        some: 'payload'
    },
    json: true // Automatically stringifies the body to JSON
};

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
    tdoID: req.body.tdoID,
    status: 'pending'
  };
  db.query(sql, job, (err, rv) => {
    if (err) throw err;
    res.status(201);
    res.json(rv.affectedRows + ' job created');
  });
});

module.exports = router
