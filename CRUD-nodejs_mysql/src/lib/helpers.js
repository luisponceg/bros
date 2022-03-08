const bcrypt = require ('bcrypt');
const helpers ={};


console.log("---helpers---");

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };


     

helpers.matchPassword = async (password,savedPassword) =>{
    try{
        console.log("valid");
        return await bcrypt.compare(password,savedPassword);
    }catch(e){
        console.log(e);
    }
    
}
module.exports = helpers;