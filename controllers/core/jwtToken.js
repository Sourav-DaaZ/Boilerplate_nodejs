module.exports= class jwt_AToken{
    constructor() { 
        this.jwt = require ('jsonwebtoken');
        this.dotenv = require('dotenv');
    }
    generateAccessToken(username){
        const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
        return this.jwt.sign({
            user:username
          }, ACCESS_TOKEN_SECRET, { expiresIn : process.env.ACCESS_TOKEN_EXPIRES_IN });
    }
    generateRefreshToken(username){
        const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
        return this.jwt.sign({
            user: username
          }, REFRESH_TOKEN_SECRET, { expiresIn : process.env.REFRESH_TOKEN_EXPIRES_IN});
    }
    verifyRefreshToken(refreshToken,callback){
        const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
        this.jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err,data)=>{
            if (err) return callback(null)
            const accessToken = this.generateAccessToken(data.user)
            callback(accessToken)
        })
    }
}