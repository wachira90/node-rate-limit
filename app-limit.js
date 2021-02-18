const express = require('express')
const app = express()
const port = 7000

const rateLimit = require('express-rate-limit');

const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
  max: 100,
  message: 'You have exceeded the 100 requests in 24 hrs limit!', 
  headers: true,
});

const mainlimit = rateLimit({
windowMs: 60 * 1000,
  //windowMs: 60 * 60 * 1000, 	// 1 hour window
  max: 5, 			// start blocking after 5 requests
  message: "Too many accounts created from this IP, please try again after an hour",
  headers: true
});

app.get("/acc", mainlimit ,function(req, res) {
  res.send('Hello World! acc')
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})