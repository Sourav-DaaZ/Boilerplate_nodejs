exports.conn=(env)=>{
    const path = require("path");
    const chalk = require('chalk');
    const fs = require('fs');
    const mongoose = require('mongoose');
    const raw_db_conn_data = fs.readFileSync(path.resolve(__dirname, "../config/mongo_config.json"));
    var db_conn_data = JSON.parse(raw_db_conn_data);
    if(env='local'){
        db_conn_data = db_conn_data.development
    }
    else if(env='prod'){
        db_conn_data = db_conn_data.production
    }
    else if(env='test'){
        db_conn_data = db_conn_data.test
    }
    else if(env='uat'){
        db_conn_data = db_conn_data.uat
    }
    mongoose.connect(db_conn_data.url,{useNewUrlParser: true },function(err){
        if(err){
            console.log(chalk.red.bold('Databse connection error'));
        }
        else{
            console.log(chalk.green.bold('Db Database Connected'));
        }
    });
    mongoose.Promise = global.Promise;
}