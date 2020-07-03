let coreController = require('./controllerCore')

var var_user_auth = class user_auth extends coreController{
    constructor() {
        super();
        const models=require('../../models');
        this.utils = require('../../utils');
        this.userAuth=models.userAuthModel;
        this.regOtp=models.regOtpModel;
        this.token=models.token;
      }
    checkUserAvailability(req,res){
        const validationRule = {
            "username": "required|email",
        }
        this.utils.validator(req.body,res,validationRule,()=>{
            this.userAuth.findOne({email: req.body.username},(err,obj)=>{
                if(err){
                    //error
                }
                if(obj!=null){
                    res.json({
                        "username":req.body.username,
                        'status' : "available"
                    });
                }
                else{
                    res.json({
                        "username":req.body.username,
                        'status' : "not available"
                    });
                }
            })
        })
    }
    regOtpRequest (req,res){
        const validationRule = {
            "username": "required|email",
        }
        this.utils.validator(req.body,res,validationRule,()=>{
            this.regOtp.findOne({email: req.body.username},(err,obj)=>{
                if(err){
                    //error
                }
                if(obj!=null){
                    let varOtp=this.utils.randomNumber(5);
                    var conditions = {email: req.body.username}
                    , update = { otp: varOtp, updatedAt : this.timeStampData}
                    , options = { multi: true };
                    this.regOtp.updateOne(conditions, update, options,(err, numAffected)=>{
                        if (err){
                        // If err 
                        }
                        else{
                            res.json({
                                "otp":varOtp,
                                "username":req.body.username,
                            });
                        }
                    });
                }
                else{
                    let varOtp=this.utils.randomNumber(5);
                    const new_regOtpmodels = new this.regOtp({
                        "email":req.body.username,
                        "otp":varOtp
                    });
                    new_regOtpmodels.save(function(err){
                        if(err){
                            // If err 
                        }
                        else{
                            res.json({
                                "otp":varOtp,
                                "username":req.body.username,
                            });
                        }
                    })
                }
            })

        })   
    }
    regOtpVerify (req,res){
        const validationRule = {
            "username": "required|email",
            "password": "required",
            "otp": "required|digits:5",
        }
        this.utils.validator(req.body,res,validationRule,()=>{
            this.userAuth.findOne({email: req.body.username},(err,obj)=>{
                if(err){
                    //error
                }
                if(obj!=null){
                    res.json({
                        "username":"user is already available",
                    });
                }
                else{
                    this.regOtp.findOne({email: req.body.username, otp:req.body.otp},(err,obj)=>{
                        if(err){
                            // err log
                        }
                        if (obj!=null){
                            const obj_userAuth = new this.userAuth({
                                "email":req.body.username,
                                "password":req.body.password
                            });
                            obj_userAuth.save((err)=>{
                                if(err){
                                    //err log
                                }
                                else{
                                    const tokenmodels = new this.token({
                                        "email" : req.body.username
                                    })
                                    tokenmodels.save((err)=>{
                                        if(err){
                                            //err
                                        }
                                        else{
                                            res.json({
                                                "msg":"User added successfully",
                                            });   
                                        }
                                    })   
                                }
                            })
                        }
                        else{
                            res.json({
                                "msg":"OTP invalid",
                            });
                        }
                    })
                }
            })
        })
    }
    usernameLogin(req,res){
        const validationRule = {
            "username": "required|email",
            "password" : "required",
            "deviceid" : "required"
        }
        this.utils.validator(req.body,res,validationRule,()=>{
            this.userAuth.findOne({email: req.body.username,password: req.body.password},(err,obj)=>{
                if(err){
                    //err
                }
                if(obj!=null){
                    let accessToken = this.jwtToken.generateAccessToken(req.body.username)
                    let refreshToken = this.jwtToken.generateRefreshToken(req.body.username)
                    this.token.findOne({email: req.body.username},(err,obj)=>{
                        if(err){
                            //pass
                        }
                        if(obj){
                            let refresh_token_flag = 0;
                            for (let i=0;i<obj.refresh_token.length;i++){
                                if(obj.refresh_token[i].device_id==req.body.deviceid){
                                    obj.refresh_token[i].token=refreshToken
                                    refresh_token_flag =1
                                }   
                            }
                            if(refresh_token_flag==0){
                                obj.refresh_token.push({token:refreshToken,device_id:req.body.deviceid})
                            }
                            var conditions = {email: req.body.username}
                            , update = {refresh_token:obj.refresh_token}
                            , options = { multi: true };
                            this.token.updateOne(conditions, update, options,(err, numAffected)=>{
                                if(err){
                                    //
                                }
                                else{
                                    res.json({
                                        "accessToken" : accessToken,
                                        "refreshToken" : refreshToken
                                    }); 
                                }
                            })
                        }
                    })
                }
                else{
                    res.json({
                        "message" : "Auth failed"
                    });    
                }
            })
        })
    }
    tokenGenerate (req,res){
        const validationRule = {
            "username" : "required",
            "refresh_token": "required",
            "deviceid" : 'required'
        }
        this.utils.validator(req.body,res,validationRule,()=>{
            this.token.findOne({email: req.body.username},(err,obj)=>{
                if(err){
                    //
                }
                if(obj!=null){
                    let auth_flag = 0;
                    for(let i=0;i<obj.refresh_token.length;i++){
                        if(obj.refresh_token[i].token == req.body.refresh_token && obj.refresh_token[i].device_id == req.body.deviceid){
                            auth_flag = 1;
                        }
                    }
                    if(auth_flag==1){
                        this.jwtToken.verifyRefreshToken(req.body.refresh_token,(accessToken)=>{
                            if (accessToken!=null){
                                res.json({
                                    "accessToken" : accessToken
                                }); 
                            }
                            else{
                                res.json({
                                    "message" : "Invalid Token"
                                }); 
                            }
                        })
                    }
                    else{
                        res.json({
                            "message" : "Invalid Token"
                        });  
                    }
                }
                else{
                    res.json({
                        "message" : "Invalid Token"
                    }); 
                }
            })
        })
    }
    loginChecker(req,res){
        res.json({
            "message" : "Successfully loged in"
        });
    }
}
module.exports = var_user_auth