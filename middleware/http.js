module.exports=(req,res,next)=>{
    const middlewareFunction = require ('./functions');
    path = req.path
    console.log (req.originalUrl)
    if(path=="/login_checker")
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