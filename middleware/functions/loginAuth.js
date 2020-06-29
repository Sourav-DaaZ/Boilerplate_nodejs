module.exports = (accessToken,callback) => {
    this.jwt = require ('jsonwebtoken');
    this.dotenv = require('dotenv');
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
    this.jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err,data)=>{
        if (err) return callback(null)
        callback(data.user)
    })
}