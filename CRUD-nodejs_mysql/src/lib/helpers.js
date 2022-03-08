const bcrypt = require ('bcrypt');
const helpers ={};




helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };


     


//  bcrypt.genSalt(10, function(err, salt) {
//      const hash =  bcrypt.hash(password, salt, function(err, hash) {
//          if (err){
                         
//                             console.log(err);
//                         }
//                        console.log(hash)
//                         return hash;
//                     });
//      });
 


helpers.matchPassword = async (password,savedPassword) =>{
    try{

        await bcrypt.compare(password,savedPassword);
    }catch(e){
        console.log(e);
    }
    
}
module.exports = helpers;