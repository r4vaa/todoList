const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const days = [,,,,,,];

app.set('view engine', 'ejs');

app.get('/' , function(req , res){
    const today = new Date();
    const currentDay = today.getDay();
    var day = ''
    switch(currentDay) {
        case 0:
            day = 'Sunday';
            break;
        case 1:
            day = 'Mondays';
            break;
        case 1:
            day = 'Tuesday';
            break;
        case 1:
            day = 'Wednesday';
            break;
        case 1:
            day = 'Thursday';
            break;
        case 1:
            day = 'Friday';
            break;
        case 1:
            day = 'Saturday';
            break;
        default:
            console.log('ERROR: Current day is equal to:' + currentDay)
    }
    res.render('list',{ kindOfDay : day});
})

app.listen(3000, function(){
    console.log('LISTENING TO PORT 3000');
})