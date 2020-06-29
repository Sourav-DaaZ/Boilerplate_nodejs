class UserController {
  constructor() {
  }

  userSignUp(a,b) {
    return new Promise(async (resolve, reject) => {
      try {
        let c=a+b+d
        return resolve(c);
      } catch (cause) {
        reject(cause);
      }
    });
  }

    async demo(){
       try{
        let demo_var = await this.userSignUp(2,4)
       console.log(demo_var);
       }
       catch (err){
           console.log('Error');
       }

    }
    
}
obj_var = new UserController()
obj_var.demo()
// module.exports = UserController;