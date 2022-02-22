exports.Twilio = (message, toUser) => {
  const accountSid = process.env.TWILIO_ACC_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: message,
      messagingServiceSid: process.env.MESSAGING_SERVICE_SID,
      to: toUser,
    })
    .then((message) => console.log(message.sid))
    .done();
};
