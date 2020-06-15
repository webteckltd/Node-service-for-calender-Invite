let express = require('express');
let app = express();
let router = require('express').Router();
let bodyParser = require('body-parser');
let inviteManager =  require("./InviteMaker");


var port =  8080;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var request  = {
    "start":new Date(),
    'end' : new Date("20 June,2020"),
    'meetingId':'wueyiuwyeuiqwy',
    'title' : 'Testing Calender Invite Feature',
    'description' : 'Ravindra Shukla Testing Calender Invite Feature',
    'organiser' : {'name' : 'Ravindra Shukla', 'email':'shukla.ravindra@yahoo.com'},
    'location' : 'London'
}

console.log(JSON.stringify(request));

router.route('/createInvite')
    .post(inviteManager.createNsend)  


app.use('/api', router);   

app.listen(port, function () {
    console.log("Running API on port " + port);
});