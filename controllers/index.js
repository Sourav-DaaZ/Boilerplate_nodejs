exports.controller=(req,res,action)=>{
    const fs = require('fs');
    const path = require("path");
    const function_raw_data = fs.readFileSync(path.resolve(__dirname, "function.json"));
    var function_data = JSON.parse(function_raw_data);
    try{
        for (var key in function_data){
            if(key == action){
                 controller_name = function_data[key].controller
                 function_name = function_data[key].function
            }
        }
        const controller_obj = require('./functions/'+controller_name)
        var controller_ = new controller_obj()
        eval('controller_.'+function_name+'(req,res)')
    }
    catch(err){
        console.log(err)
    }
}