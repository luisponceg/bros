const bcrypt = require ('bcrypt');



console.log('----helpers--------');
// helpers.encryptPassword = async (password) => {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);
//     return hash;
//   };


     


//  bcrypt.genSalt(10, function(err, salt) {
//      const hash =  bcrypt.hash(password, salt, function(err, hash) {
//          if (err){
                         
//                             console.log(err);
//                         }
//                        console.log(hash)
//                         return hash;
//                     });
//      });
 


// helpers.matchPassword =  (password,savedPassword,function(err, hash) =>{}) =>{
                  
//         bcrypt.compare(password,savedPassword);
   
// } 
module.exports = bcrypt.hash;