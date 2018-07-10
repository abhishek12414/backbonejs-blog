const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog-app');

const ip = 'localhost';
const port = 3000;
const url = `http://${ip}:${port}`;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

const Schema = mongoose.Schema;
const BlogSchema = new Schema({
    author: String,
    title: String,
    url: String
});

mongoose.model('Blog', BlogSchema);
const Blog = mongoose.model('Blog');

//Routes
app.get('/api/blogs', function(req, res){
    Blog.find(function(                                 docs) {
        res.status(200).send(docs);
    });
});

app.post('/api/blogs', function(req, res){
    let blog = new Blog(req.body);
    blog.save(function(err, doc) {
        res.send(doc);
    });
});

app.delete('/api/blogs/:id', function(req, res){
    Blog.remove({_id: req.params.id}, function(err){
        res.send({_id: req.params.id});
    });
});

app.put('/api/blogs/:id', function(req, res) {
    Blog.update({_id: req.params.id}, req.body, function(err) {
        res.send({_id: req.params.id});
    })
})
app.listen(port, ()=>{
    console.log(`Server is running on ${url}`);
});