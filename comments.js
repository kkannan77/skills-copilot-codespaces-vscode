// create web server
const express = require('express');
const app = express();
// read file
const fs = require('fs');
// read json file
const comments = JSON.parse(fs.readFileSync('comments.json'));
// use body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});
// get comment by id
app.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(comment => comment.id == id);
    res.json(comment);
});
// create a comment
app.post('/comments', (req, res) => {
    const id = comments.length + 1;
    const newComment = {
        id: id,
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
    };
    comments.push(newComment);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.json(newComment);
});
// update a comment
app.put('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(comment => comment.id == id);
    comment.name = req.body.name;
    comment.email = req.body.email;
    comment.comment = req.body.comment;
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.json(comment);
});
// delete a comment
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    const index = comments.findIndex(comment => comment.id == id);
    comments.splice(index, 1);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.json({ message: 'Comment deleted' });
});
// start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});