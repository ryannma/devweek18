const router = require('express').Router();
const fs = require('fs');

router.get('/', (req, res) => {
  if (fs.existsSync('/power')) {
    const filesArr = [];
    fs.readdir('/power', (err, files) => {
      files.forEach(file => {
        filesArr.push(file);
      });
    })
    res.json(filesArr);
  }
  else {
    res.json({message: 'Dir does not exist'});
  }
});

module.exports = router
