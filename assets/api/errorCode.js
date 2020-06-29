module.exports = (key) => {
    var data={
        "ERR001" : "demo"
    };
    try{
      if(data[key]==null){
        console.log(key +"not found in error-code array !")
      }
      return data[key]
      }
    catch(err) {
      // Do Nothing
      }
  }