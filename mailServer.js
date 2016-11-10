
var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, ' +
        'x-parse-session-token');
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});

// Sendmail route
app.post('/sendmail', function(req, res){
    var options = {
        auth: {
            api_key: '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'
        }
    }
    var mailer = nodemailer.createTransport(sgTransport(options));
    mailer.sendMail(req.body, function(error, info){
        if(error){
            res.status('401').json({err: info});
            console.log('error', error )
        }else{
            res.status('200').json({success: true});
            console.log('success' );
        }
    });
});

// Start server
var port = 8080, ip = "192.168.10.63";
app.listen(port, ip, function() {
    console.log('Express server listening on http://localhost:%d', port);
});

