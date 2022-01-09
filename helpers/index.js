require('dotenv').config()

function isLoggedIn(req, res, next) {
    if(req.get('Authorization') === process.env.JWT) {
        next();
    } else {
        res.sendStatus(504);
    }
}

module.exports = isLoggedIn;
