const mongoose = require('mongoose');
const timeStamp=require('../utils/timestamp.js');

var timeStampData=timeStamp;

const Schema = mongoose.Schema;

const regOtpSchema= new Schema({
    email:{
        type:String    
    },
    otp:{
        type:String,
        required:[true,'Required!']    
    },
    createdAt:{
        type: Object, 
        default:timeStampData   
    },
    updatedAt:{
        type: Object, 
        default:timeStampData 
    }
}); 


module.exports = mongoose.model('RegOtps',regOtpSchema);