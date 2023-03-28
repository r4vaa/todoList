const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let items = ['Buy Food',
    'Cook Food',
    'Eat Food'];

let workItems = [];
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
   
    res.render('list',{ listTitle : day , newListItem: items});
})

app.post('/', function(req, res){
    const item = req.body.newItem;
   
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect('/work')
    }else{
        items.push(item);
        res.redirect('/');
    }
   
})

app.get('/work', function(req ,res ) { 
    res.render('list', { listTitle : "Work List", newListItem : workItems});
})

app.post('/work', function() { 
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work');
})

app.get('/about' , function(req, res) {
    res.render('about')
})

app.listen(3000, function(){
    console.log('LISTENING TO PORT 3000');
})