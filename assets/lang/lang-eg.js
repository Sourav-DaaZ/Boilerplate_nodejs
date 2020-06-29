module.exports = (key) => {
  var data={
      "email_validation_errorr":"Please enter valid email address.",
      "attribute_checker" : " field is required.",
      "otp_length_validation_error" : "Otp length should be 5.",
      "username_length_validation_error" : "Username should be at least 5 characters.",
      "password_length_validation_error" : "Password should be at least 8 characters.",
      "signUp_completed" : "Hurrah! signup completed.",
      "emailId_existence_error" : "Email Id is already registered"
  };
  try{
    if(data[key]==null){
      console.log(key +"not found in lang array !")
    }
    return data[key]
    }
  catch(err) {
    // Do Nothing
    }
}