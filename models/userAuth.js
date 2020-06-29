const mongoose = require('mongoose');
const timeStamp=require('../utils/timeStamp.js');

var timeStampData=timeStamp;

const Schema = mongoose.Schema;

const usersSchema= new Schema({
    email:{
        type:String,
        required:[true,'Required!']    
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String  
    },
    password:{
        type:Object,
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


module.exports = mongoose.model('Users',usersSchema);