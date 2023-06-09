const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js')
const mongoose = require('mongoose');
const _ = require('lodash');







app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))

app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://admin-dheeraj:Test123@cluster1.vcdk5jr.mongodb.net/todolistDB', { useNewUrlParser : true});

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

const item4 = new Item({
    name : 'Wait for lunch'
})

// item5.save()
// .then(data => console.log(data + "Successfully addded   "));

const defaultItems = [item1, item2, item3, item4];

const listSchema = { 
    name : String,
    items : [ itemsSchema ]
}

const List = mongoose.model('List', listSchema);


app.get('/' , function(req , res){

    const data =  Item.find({}).then(data => {
        if(data.length === 0 ){
            Item.insertMany(defaultItems)
            .then(function(err) {
                if(err){
                    console.log(err)
                    console.log("successfully added")
                }
            })
            res.redirect('/');
        }else{
            res.render('list',{ listTitle :"Today" , newListItems: data});
        }
       
    })
    
})


app.post('/', function(req, res){
    const itemName = req.body.newItem ;
    const listName = req.body.list;
    const item = new Item({
        name : itemName
    })
    if(listName === "Today"){
        item.save()
        res.redirect('/')
    }else{
        List.findOne({name : listName}).then(foundList => {
            foundList.items.push(item)
            foundList.save()
            res.redirect('/' + listName)
        })
    }
    
   
})

app.post('/delete', async function(req, res) {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;
    
    if(listName === 'Today'){
        const deletedItem = await Item.findByIdAndRemove({ _id: checkedItemId })
        res.redirect('/')
    }else{
       const deleteItem = await List.findOneAndUpdate({name : listName} , { $pull: {items: {_id: checkedItemId }}})
       res.redirect('/' + listName)
    }
    
})

app.get('/:list', async function(req, res) {
   const customListName =  _.capitalize(req.params.list);
    List.findOne({name : customListName}).then(data => {
        if(!data){
            //Create a new list
            const list = new List({
                name : customListName,
                items: defaultItems
            })
            list.save();
            res.redirect('/' + customListName)
        }else{
            //Show an existing list
            res.render('list',{ listTitle : data.name , newListItems: data.items})
}})
       
} )



app.get('/about' , function(req, res) {
    res.render('about')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log('Server has started successfully');
})