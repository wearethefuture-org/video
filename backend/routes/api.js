require('dotenv').config()
var express = require('express');
var router = express.Router();
var axios = require('axios');
const qs = require('qs');
var faker = require("faker");
var AccessToken = require("twilio").jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;


const SWOOGO_API_KEY = process.env.SWOOGO_API_KEY;
const SWOOGO_API_SECRET = process.env.SWOOGO_API_SECRET;
const basic_token = Buffer.from(`${SWOOGO_API_KEY}:${SWOOGO_API_SECRET}`).toString('base64');

/* GET Events Lists. */
router.get('/getEvents', function(req, res, next) {
  axios.request({
    url: 'https://www.swoogo.com/api/v1/oauth2/token.json',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${basic_token}`,
    },
    data: qs.stringify({
      grant_type: 'client_credentials'
    }),
  }).then((response) => {
    const token = response.data.access_token;
    axios.request({
      url: 'https://www.swoogo.com/api/v1/events.json',
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then((response) => {
      const lists = response.data['items'];
      res.send({
        lists
      })
    }).catch((err) => {
      res.sendStatus(400)
    })
  }).catch((err) => {
    res.sendStatus(400)
  })
});

/* GET Event Members. */

router.get('/getEventMemners/:eventId', function(req, res, next) {
  const { eventId } = req.params;
  axios.request({
    url: 'https://www.swoogo.com/api/v1/oauth2/token.json',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${basic_token}`,
    },
    data: qs.stringify({
      grant_type: 'client_credentials'
    }),
  }).then((response) => {
    const token = response.data.access_token;
    axios.request({
      url: `https://www.swoogo.com/api/v1/registrants.json?event_id=${eventId}&fields=id,email,first_name,last_name,job_title,company,profile_picture,checked_in_at`,
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then((response) => {
      const lists = response.data['items'];
      res.send({
        lists
      })
    }).catch((err) => {
      res.sendStatus(400)
    })
  }).catch((err) => {
    res.sendStatus(400)
  })
});

// Endpoint to generate access token
router.get('/token', function(request, response) {
  var identity = faker.name.findName();

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  var token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET
  );

  // Assign the generated identity to the token
  token.identity = identity;

  const grant = new VideoGrant();
  // Grant token access to the Video API features
  token.addGrant(grant);

  // Serialize the token to a JWT string and include it in a JSON response
  response.send({
      identity: identity,
      token: token.toJwt()
  });
});


module.exports = router;
