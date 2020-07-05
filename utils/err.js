module.exports = class errorRes {
    constructor() { 
        this.assets_api = require ('../assets/api');
        
    }
    sendResponse(res,code){
        let errorMsg = this.assets_api.errorCode(code)
        res.status(400).json({
            ERROR_CODE : code,
            msg : errorMsg
        })
        console.log(errorMsg)
    }
}