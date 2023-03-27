const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.get('/' , function(req , res){
    const today = new Date();
    const currentDay = today.getDay();

    if(currentDay === 6 || currentDay === 0){
        res.write('<h1>its a weekend hooray</h1>');
    }else{
        res.write('<p>its not the weekend</p>');
        res.write('<h1>boohh u have to work today</h1>');
        res.send();
    }
})

app.listen(3000, function(){
    console.log('LISTENING TO PORT 3000');
})