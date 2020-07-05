let coreController = require('./controllerCore')

var var_postloginuserauth = class postloginuserauth extends coreController{
    constructor() {
        super();
        const models=require('../../models');
        this.utils = require('../../utils');
        this.userAuth=models.userAuthModel;
        this.regOtp=models.regOtpModel;
        this.token=models.token;
      }
      logout(req,res){
        const validationRule = {
            "deviceid" : "required"
        }
        this.utils.validator(req.body,res,validationRule,async ()=>{
            let username = await this.jwtToken.ger_user(req.token)
            this.token.findOne({email: username},(err,obj)=>{
                if(err){
                    //err
                }
                if(obj){
                    let search_flag = 0;
                    for (let i=0;i<obj.refresh_token.length;i++){
                        if(obj.refresh_token[i].device_id==req.body.deviceid){
                            obj.refresh_token.splice(i,1)
                            search_flag = 1
                        }   
                    }
                    if(search_flag==0){
                        this.errRes.sendResponse(res,'ERR001')
                        return
                    }
                    var conditions = {email: username}
                    , update = {refresh_token:obj.refresh_token}
                    , options = { multi: true };
                    this.token.updateOne(conditions, update, options,(err, numAffected)=>{
                        if(err){
                            //
                        }
                        else{
                            res.json({
                                'msg' : "successfully logging out"
                            })
                        }
                    })
                }
            })
        })

      }
}

module.exports = var_postloginuserauth