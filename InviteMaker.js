var ical = require('./my-ical-generator');
const { v4: uuidv4 } = require('uuid');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

exports.createNsend = function (req, res) {
    console.log("createMeetingservice --createMeeting = " + JSON.stringify(req.body));
    let eventObj = req.body;
    try {
        var cal = ical();
        cal.setDomain("http://medwhiz.in").setName("Ravindra Calendar Invite");
        cal.addEvent({
            start: new Date(eventObj.start),
            end: new Date(eventObj.end),
            summary: eventObj.title,
            uid: uuidv4(),
            sequence: 0,
            description: eventObj.description,
            location: eventObj.location,
            organizer: {
                        name: eventObj.organiser.name,
                        email: eventObj.organiser.email
                      },
            method: 'request'
        });
        var path = __dirname + '/'+ eventObj.meetingId + '.ics';
        //cal.saveSync(path);
        var inviteData  =  cal.getCalString();
        console.log(inviteData);

        var smtpOptions = {
            host:'mail.smtp2go.com',
            port: 2525,
            secureConnection: true,
            auth:{
               user:'rshukla75',
               pass:'*************'
            }
        };

        var transporter = nodemailer.createTransport(smtpTransport(smtpOptions));

        var mailObj = {
            from: "webteck.com@gmail.com",
            //to: "shukla.ravindra@yahoo.com",
            to: "ravindranath.shukla@telefonica.com",
            subject: eventObj.title,
            text: eventObj.description,
            //html: "Anything here",
              icalEvent: {
                method: 'request',
                content: inviteData
            }
           
        };
        
        transporter.sendMail(mailObj, function(error, info){
            if(error){
                console.log(error);
                res.status(400).json({
                    status: "error",
                    message: error.message
                });
            }
            else{
                console.log('Message sent:');  
                res.status(200).json({
                    status: 'sucess',
                    data: "meeting invite"
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "error",
            message: error.message
        });
    }
}