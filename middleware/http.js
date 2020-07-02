module.exports=(req,res,next)=>{
    const middlewareFunction = require ('./functions');
    path = req.originPath
    if(path=="user_auth")
    {
        if(req.path=="/login_checker"){
            middlewareFunction.loginAuth(req.token,(username)=>{
                if(username!=null){
                    next();
                }
                else{
                    res.json({
                        "message":"login failed"
                    });
                }
            })
        }
        else{
            next();
        }
    }
    else if(path=="post_login_auth")
    {
        middlewareFunction.loginAuth(req.token,(username)=>{
            if(username!=null){
                next();
            }
            else{
                res.json({
                    "message":"login failed"
                });
            }
        })
    }
    else{
        next();
    }
}