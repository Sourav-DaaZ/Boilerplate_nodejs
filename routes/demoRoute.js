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
    middlewareObj.middleware(req,res,next);
});

// Routes
// =====================================
// demoRoute ========================
// =====================================
// 
// 
router.post('/', async function (req, res, next) {
    action = 'demo';
    controllerObj.controller(req,res,action);
    res.json({
        'status':200,
        'msg':"I am working fine"
    });
});

module.exports=router;