const router = require('express').Router()
const Article = require('../models/article')
router.post('/', (req,res) => {
    const article = new Article({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    })
    article.save().then(result => {
        res.status(201).json(result)
    }).catch(err => {
        res.send('error')
        throw err;
    })
})
module.exports = router