/**
 * Created : ashish8833
 * Email : ashishkadam83@gmail.com
 *
 * Authentication Logic Here, Like Login, Social Login, Passport JWT verification
 * 1. Login
 * 2. Email Verification
 */

/**
 * Expire token
 * { expiresIn: '1m'}
 */
const {google} = require('googleapis');
const axios = require('axios');
var contacts = google.people('v1');
var calendar = google.calendar('v3');
const config = require('../../config/googleConfig')
async function listConnectionNames(authValue) {
  return new Promise(async (resolve, reject) => {
   contacts.people.connections.list({
      resourceName: 'people/me',
      access_token: authValue.googleDetails.accessToken,
      personFields: 'names,emailAddresses',
    }, function (err, response) {
      if(err){
        return reject(err)
      }
      if(response){
        return resolve(response.data);
      }

      // handle err and response
    })
    
  });
}
async function eventInvitationSend(authValue) {
  console.log('authValue',authValue)
  var event = {
    'summary': 'Google I/O 2015',
    'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'A chance to hear more about Google\'s developer products.',
    'start': {
      'dateTime': '2020-01-20T12:00:00-07:00',
      'timeZone': 'America/Los_Angeles',
    },
    'end': {
      'dateTime': '2020-01-20T12:30:00-07:00',
      'timeZone': 'America/Los_Angeles',
    },
    'recurrence': [
      'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'attendees': [
      {'email': `${authValue.email}`},
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };
  
  return new Promise(async (resolve, reject) => {
    calendar.events.insert({
      access_token: authValue.googleDetails.accessToken,
      calendarId: 'primary',
      resource: event,
    }, function(err, event) {
      if (err) {
        console.log('There was an error contacting the Calendar service: ' + err);
        return;
      }
      console.log('Event created: %s', event.htmlLink);
    });
   
    
  });
}
const getUserPeoples = async (req, res) => {
  const oAuth2Client = new google.auth.OAuth2(
    config.googleClientId, config.client_secret, config.redirect_uris[0]);
    await listConnectionNames(req.body).then(response=>{
      console.log('response=====',response)
      return res.status(200).json({
        status:true,
        data:response
      })
    }).catch(err=>{
      return res.status(200).json({
        status:false,
        data:err
      })
    });

    console.log('tempData')
    
    //https://www.googleapis.com/plus/v1/people/me?access_token={access_token}
    
    // res.status(200).json({
    //   status:true
    // });
 
};
const eventInvitation = async (req, res) => {
  const oAuth2Client = new google.auth.OAuth2(
    config.googleClientId, config.client_secret, config.redirect_uris[0]);
    await eventInvitationSend(req.body).then(response=>{
      console.log('response=====',response)
      return res.status(200).json({
        status:true,
        data:response
      })
    }).catch(err=>{
      return res.status(200).json({
        status:false,
        data:err
      })
    });

    console.log('tempData')
    
    //https://www.googleapis.com/plus/v1/people/me?access_token={access_token}
    
    // res.status(200).json({
    //   status:true
    // });
 
};
module.exports = {
  getUserPeoples,
  eventInvitation
};
