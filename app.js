const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js')
const mongoose = require('mongoose');







app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))

app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB', { useNewUrlParser : true});

const itemsSchema = new mongoose.Schema ({
    name : String
});

const Item = mongoose.model('Item',itemsSchema);

const item1 = new Item ({

    name : 'welcome for todolist'
})

const item2 = new Item({
    name : "Hit + button to add a new Item"
})

const item3 = new Item({
    name : "<-- Hit this to delete an item"
})

const item5 = new Item({
    name : 'Wait for lunch'
})

// item5.save()
// .then(data => console.log(data + "Successfully addded   "));

const defaultItems = [item1, item2, item3];

// Item.insertMany(defaultItems)
// .then(function(err) {
//     if(err){
//         console.log(err)
//         console.log("successfully added")
//     }
// })


app.get('/' , async function(req , res){

    const items = await Item.find()

    res.render('list',{ listTitle :"Today" , newListItems: items});
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
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work');
})

app.get('/about' , function(req, res) {
    res.render('about')
})

app.listen(3000, function(){
    console.log('LISTENING TO PORT 3000');
})