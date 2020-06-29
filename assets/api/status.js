module.exports = (key) => {
    var data={
        "ok":200,
        "Created":201,
        "Accepted":202,
        "No content":204,
        "Moved Permanently":301,
        "Found":302,
        "See Other":303,
        "Not Modified":304,
        "Temporary Redirect":307,
        "Bad Request":400,
        "Unauthorized":401,
        "Forbidden":403,
        "Not Found":404,
        "Method Not Allowed":405,
        "Not Acceptable":406,
        "Precondition Failed":412,
        "Unsupported Media Type":415,
        "Internal Server Error":500,
        "Service Unavailable":503
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