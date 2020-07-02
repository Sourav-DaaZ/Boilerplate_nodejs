//.............................................................. 
//..............................require modules.................
//chalk :   Colorize You Console.
//express : a minimal and flexible Node.js web application 
//          ramework that provides a robust set of features for 
//          web and mobile applications.
//body-parser : body-parser extract the entire body portion of 
//              an incoming request stream and exposes it on 
//              req.body
//mongoose : mongoose-delete is simple and lightweight plugin 
//           that enables soft deletion of documents in MongoDB
//dotenv :  Dotenv is a zero-dependency module that loads 
//          environment variables from a .env file into 
//          process.env
////////////////////////////////////////////////////////////////
//..............................NPM modules....................
const chalk = require('chalk');
const express = require ('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
////////////////////////////////////////////////////////////////
//..............................route index.....................
const routes = require('./routes');
//..............................controller index................
const controller=require('./controllers');
//..............................middleware index................
////////////////////////////////////////////////////////////////
dotenv.config();
const app=express();
const db = require('./db/connection')
app.use(bodyParser.json());
////////////////////////////////////////////////////////////////
//============================================================== 
db.conn(process.env.NODE_ENV);
//set up end point URLs

//1.End point url name -> "demo"
    app.use('/demo',routes.demoRoute);
    app.use('/user_auth',routes.userauth);
    app.use('/post_login_auth',routes.postloginuserauth)
//2.

////////////////////////////////////////////////////////////////
//.............middleware for error handeling...................
app.use((req,res,next) => {
    next();
});
app.use((req, res, next) => {
    res.status(404);
    res.json({
        error:{
            message: "Url not found"
        }
    });
});
////////////////////////////////////////////////////////////////
//Start Node Server
app.listen(process.env.PORT,() =>{
    console.log(chalk.blue.bold('Server Running Sucessfully!'))
    console.log(chalk.grey.bold('port -> '+process.env.PORT))
})
