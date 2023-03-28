const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let items = ['Buy Food',
    'Cook Food',
    'Eat Food'];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.get('/' , function(req , res){
    const today = new Date();
    
    const options = {
        weekday : 'long',
        day : 'numeric',
        month: 'long'
    }
    
    const day = today.toLocaleDateString('en-in', options);
   
    res.render('list',{ kindOfDay : day , newListItem: items});
})

app.post('/', function(req, res){
    const item = req.body.newItem;
     items.push(item);
    res.redirect('/');
})

app.listen(3000, function(){
    console.log('LISTENING TO PORT 3000');
})