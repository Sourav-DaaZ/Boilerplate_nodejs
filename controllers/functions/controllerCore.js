var_controllerCore = class controllerCore {
    constructor() {
        let timeStamp=require('../../utils/timestamp.js');
        let jwtToken_class = require("../core/jwtToken.js");
        let err_class = require("../../utils//err");
        this.timeStampData=timeStamp();
        this.jwtToken = new jwtToken_class()
        this.errRes = new err_class()
    }
}

module.exports = var_controllerCore