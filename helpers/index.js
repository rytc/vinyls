require('dotenv').config()

function isLoggedIn(req, res, next) {
    if(req.get('Authorization') === process.env.JWT) {
        next();
    } else {
        res.status(401).json({error: "Authentication failed"});
    }
}

module.exports = isLoggedIn;
