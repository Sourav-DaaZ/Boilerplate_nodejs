const mongoose = require('mongoose');
const timeStamp=require('../utils/timeStamp.js');

var timeStampData=timeStamp;

const Schema = mongoose.Schema;

const tokenSchema= new Schema({
    email:{
        type:String,
        required:[true,'Required!']    
    },
    refresh_token:{
        type:String  
    }
}); 


module.exports = mongoose.model('token',tokenSchema);