// const jwt = require('jsonwebtoken');
// const bcrypt = require("bcrypt");
// const employer = require('../../models/Employer/register');


// exports.EmployerRegister =async(req,  res)=>{
//     // console.log(req.body);
//     try {
//         const user = await employer.findOne({ email: req.body.email }).exec();
//         if(user) return res.status(400).json({
//             message:' User already registered'
//         });
    
//         const{
//             name,
//             industry,
//             email,
//             password    
//         } = req.body;

//         const hash_password = await bcrypt.hash(password, 10,)

//         const _user = new employer({
//             name,
//             industry,
//             email,
//             hash_password
//         });
  
//         console.log("USER :: ",_user)
  
//         const savedUser = await _user.save();
//         // console.log("saveduser :: ",savedUser)

//         if(savedUser){    
//                 const payload = {
//                   id: savedUser.id,
//                   email : savedUser.email
//                 }
//                 jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : 31556926},(err,token) => {
//                   // return res.status(200).json({status :"success", data : token})
//                   return res.status(201).json({
//                     data :{id: savedUser.id , token:token},
//                     status :"success",
//                     message:"Employer registered successfully"
                
//                 })
//                 })
//               }
//               else{
//                 return res.status(400).json({ error: "Invalid email or password" }); 
              
//         // return res.status(201).json({
            
//         //  message : "User created successfully",
//         //  data : _user
//             // })
//         }
  
//       } catch (error) {
//         return res.status(400).json({
//             message : error
//         });
//       }
//   }


//   exports.EmployerLogin = async (req, res) => {
// console.log(req.body);
//     try {
//       const { email, password } = req.body;
//       // Check if user exists
  
//        await employer.findOne({  email }).then((user) => {
//         // console.log("EMAIL :: ", user)
//         if (!user) {
//           return res.status(400).json({ error: "Invalid email or password" });
//         }
//         bcrypt.compare(password,user.hash_password,function(error,isMatch){
//         //  console.log("MATCH :: ", isMatch)
//           if(isMatch){
//             const payload = {
//               id: user.id,
//               email : user.email,
//               name : user.name
//             }
//             jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : 31556926},(err,token) => {
//               return res.status(200).json({status :"success", data:{id: user.id,token : token, name : user.name }})

//             })
//           }
//           else{
//             return res.status(400).json({ error: "Invalid email or password" }); 
//           }
  
//         } )
//        });
//     } catch (error) {
//       console.log(error);
//       res.status(400).json({ error: "Semething Went Wrong" });
//     }
//   };

const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const employer = require('../../models/Employer/register');


exports.EmployerLogin =async(req,  res)=>{
  const {token, email, sub , name} = req.body
    try {
        const user = await employer.findOne({ email:email }).exec();
        
        if(user)  return res.status(201).json({
          data :{id: user.id , token:token, name: user.name},
          status :"success",
          message:"Employer registered successfully"
      })
       // const hash_password = await bcrypt.hash(password, 10,)
        const _user = new employer({
            name,
            sub,
            email
            // hash_password
        });
        // console.log("USER :: ",_user)
  
        const savedUser = await _user.save();
        // console.log("saveduser :: ",savedUser)

        if(savedUser){    
                // const payload = {
                //   id: savedUser.id,
                //   email : savedUser.email
                // }
                // jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : 31556926},(err,token) => {
                  // return res.status(200).json({status :"success", data : token})
                  return res.status(201).json({
                    data :{id: savedUser.id , token:token, name:savedUser.name },
                    status :"success",
                    message:"Employer registered successfully"
                
                })
                // })
              }
              else{
                return res.status(400).json({ error: "Invalid email or password" }); 
              
        // return res.status(201).json({
            
        //  message : "User created successfully",
        //  data : _user
            // })
        }
  
      } catch (error) {
        return res.status(400).json({
            message : error
        });
      }
  }


//   exports.EmployerLogin = async (req, res) => {
// console.log(req.body);
//     try {
//       const { email, password } = req.body;
//       // Check if user exists
  
//        await employer.findOne({  email }).then((user) => {
//         // console.log("EMAIL :: ", user)
//         if (!user) {
//           return res.status(400).json({ error: "Invalid email or password" });
//         }
//         bcrypt.compare(password,user.hash_password,function(error,isMatch){
//         //  console.log("MATCH :: ", isMatch)
//           if(isMatch){
//             const payload = {
//               id: user.id,
//               email : user.email,
//               name : user.name
//             }
//             jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : 31556926},(err,token) => {
//               return res.status(200).json({status :"success", data:{id: user.id,token : token, name : user.name }})

//             })
//           }
//           else{
//             return res.status(400).json({ error: "Invalid email or password" }); 
//           }
  
//         } )
//        });
//     } catch (error) {
//       console.log(error);
//       res.status(400).json({ error: "Semething Went Wrong" });
//     }
//   };
