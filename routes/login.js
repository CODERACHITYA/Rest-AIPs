const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
router.post('/', (req, res) => {
    const { email, password } = req.body
    if(!email || !password) {
        return res.status(422).json({ error: 'all things are requried' })
    }
    User.findOne({email: email}, (err , result) => {
        if(err){
            return res.status(500).json({ error: 'Something Went Wrong' })
        }
        if(result){
            bcrypt.compare(password, result.password).then((match) => {
                if(match) {
                    const accessToken = jwt.sign({
                        id: result._id,
                        name: result.name,
                        email: result.email
                    },process.env.JWT_Key)
                    return res.send({
                        accessToken: accessToken,
                        type: 'Bearer'
                    })
                }
                return res.status(401).json({ error: 'Email not registered' })
            }).catch(err=> {
                throw err
            })
        }else{
            return res.status(401).json({ error: 'Email not registered' })
        }
    })
})
module.exports = router