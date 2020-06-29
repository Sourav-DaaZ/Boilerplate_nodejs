var_controllerCore = class controllerCore {
    constructor() {
        var timeStamp=require('../../utils/timestamp.js');
        this.timeStampData=timeStamp();
        let jwtToken_class = require("../core/jwtToken.js");
        this.jwtToken = new jwtToken_class()
    }
}

module.exports = var_controllerCore