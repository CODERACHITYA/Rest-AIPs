const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
router.post('/', (req, res) => {
    const { name, email, password } = req.body
    if(!name || !email || !password){
        return res.status(422).json({ error: 'all things are requried' })
    }
    User.exists({ email: email }, async (err, result) => {
        if(err){
            return res.status(500).json({ error: 'Something Went Wrong' })
        }
        if(result) {
            return res.status(422).json({ error: 'Email already taken' })
        }
        else {
            const bp = await bcrypt.hash(password, 10)
            const user = new User({
                name,
                email,
                password: bp
            })
            user.save().then((result) => {
                const accessToken = jwt.sign({
                    id: user._id,
                    name: user.name,
                    email: user.email
                },process.env.JWT_Key)
                return res.send({
                    accessToken: accessToken,
                    type: 'Bearer'
                })
            }).catch((err) => {
                return res.status(500).json({ error: 'Something Went Wrong' })
            });
        }
    })
})
module.exports = router