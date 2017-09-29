// Twilio Credentials 
//For future= > Move to ENV Variables for security
//require the Twilio module and create a REST client 

var client = require('twilio')(process.env.TWILIO_ACCOUNTSID, process.env.TWILIO_AUTHTOKEN); 


console.log(process.env.TWILIO_AUTHTOKEN, process.env.TWILIO_ACCOUNTSID)

function sms(to, msg){
client.messages.create({ 
    to: to, 
    from: "+18582391142", 
    body: msg, 
}, function(err, message) {
if(err){console.log(err)} 
    console.log(message); 
});
};

module.exports = sms;