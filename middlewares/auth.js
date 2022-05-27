const { use } = require('bcrypt/promises')
const jwt = require('jsonwebtoken')
function auth(req, res, next) {
    let authheader = req.headers
    if(authheader) {
        let token = req.headers.authorization
        jwt.verify(token, process.env.JWT_Key, (err, user) => {
            if(err) {
                return res.sendStatus(403)
            }
            req.user = user
            next();
        })
    } else {
        res.sendStatus(401)
    }
}
module.exports = auth