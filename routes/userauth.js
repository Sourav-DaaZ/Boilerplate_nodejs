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
    middlewareObj.middleware(req,res,next);
});

// Routes
// =====================================
// check username ========================
// =====================================
// 
// 
router.post('/check_user_availability', async function (req, res, next) {
    action = 'check_user_availability';
    controllerObj.controller(req,res,action);
});

// Routes
// =====================================
// request for reg otp  ========================
// =====================================
// 
// 
router.post('/reg_otp_request', async function (req, res, next) {
    action = 'reg_otp_request';
    controllerObj.controller(req,res,action);
});

// Routes
// =====================================
// request for reg otp  ========================
// =====================================
// 
// 
router.post('/reg_otp_verify', async function (req, res, next) {
    action = 'reg_otp_verify';
    controllerObj.controller(req,res,action);
});

// Routes
// =====================================
// request for reg otp  ========================
// =====================================
// 
// 
router.post('/username_login', async function (req, res, next) {
    action = 'username_login';
    controllerObj.controller(req,res,action);
});
// Routes
// =====================================
// request for reg otp  ========================
// =====================================
// 
// 
router.post('/token', async function (req, res, next) {
    action = 'token';
    controllerObj.controller(req,res,action);
});
// Routes
// =====================================
// request for reg otp  ========================
// =====================================
// 
// 
router.post('/login_checker', async function (req, res, next) {
    res.json({
        "message" : "Successfully loged in"
    });
});

module.exports=router;