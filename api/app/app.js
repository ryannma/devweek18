const app = require('./server')
const port = process.env.PORT || 8080 // set port

// START SERVER
const server = app.listen(port, function() {
  console.log(`listening on http://localhost:${port}`)
});
