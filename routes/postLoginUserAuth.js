//.............................................................. 
//..............................require modules.................
//express : a minimal and flexible Node.js web application 
//          ramework that provides a robust set of features for 
//          web and mobile applications.
//jwt :  
////////////////////////////////////////////////////////////////
//..............................NPM modules....................
const express = require('express');
const jwt = require ('jsonwebtoken');
////////////////////////////////////////////////////////////////
//..............................route index.....................
//..............................controller index................
const controllerObj=require('../controllers');
//..............................middleware index................
const middlewareObj=require('../middleware');
////////////////////////////////////////////////////////////////
const router=express.Router();
refreshTokenArray = [];
////////////////////////////////////////////////////////////////
//============================================================== 
//middleware
router.use(async (req,res,next)=>{
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
    }
    originalUrl_array=req.originalUrl.split('/');
    req.originPath=originalUrl_array[1]
    middlewareObj.middleware(req,res,next);
});

// Routes
// =====================================
// check username ========================
// =====================================
// 
// 
router.post('/logout', async function (req, res, next) {
    action = 'logout';
    controllerObj.controller(req,res,action);
});
module.exports=router;