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
router.get('/:id', (req, res) => {
    const id = req.params.id
    Article.findOne({_id: id}, (err, document) => {
        if(err){
            throw err
        }if(document){
            return res.json(document)
        }else{
            return res.status(404).json({ error: 'article not found' })
        }
    })
})
router.patch('/:id', (req, res) => {
    const idu = req.params.id
    const { title, body, author } = req.body
    Article.findOne({_id: idu}, (err, document) => {
        if(err){
            throw err
        }if(document){
            Article.updateOne({ _id: idu }, { title, body, author }, (err, data) => {
                if(err){
                    throw err
                } if(data){
                    Article.findOne({_id: idu}, (err, document) => {
                        if(err){
                            throw err
                        }if(document){
                            return res.json(document)
                        }else{
                            return res.status(404).json({ error: 'article not found' })
                        }
                    })
                }
            })
        }else{
            return res.status(404).json({ error: 'article not found' })
        }
    })

})
router.delete('/:id', (req, res) => {
    const idd = req.params.id
    Article.findOne({_id: idd}, (err, document) => {
        if(err){
            throw err
        }if(document){
            Article.deleteOne({_id: idd}, (err, data) => {
                if(err){
                    throw err
                } if(data){
                    res.send('deleted')
                } else {
                    res.status(404).render('not found')
                }
            })
        }else{
            return res.status(404).json({ error: 'article not found' })
        }
    })
})
module.exports = router