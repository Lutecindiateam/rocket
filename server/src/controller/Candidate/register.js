// const jwt = require('jsonwebtoken');
// const bcrypt = require("bcrypt");
// const candidate = require('../../models/Candidate/candidate');


// exports.CandidateRegister =async(req,  res)=>{
   
//         try {
//             const user = await candidate.findOne({ email: req.body.email }).exec();
//             if(user) return res.status(400).json({
//                 message:' User already registered'
//             });
        
//             const{
//                 first_name,
//                 last_name,
//                 phone,
//                 profile_title,
//                 profile_in_brief,
//                 current_organization,
//                 current_ctc,
//                 total_experience,
//                 gender,
//                 email,
//                 password,
//                 state,
//                 city
//             } = req.body;
    
//             //  console.log(req.body)
            
//             const _user = new candidate({
//                 first_name,
//                 last_name,
//                 phone,
//                 profile_title,
//                 profile_in_brief,
//                 current_organization,
//                 current_ctc,
//                 total_experience,
//                 gender,
//                 email,
//                 password,
//                 state,
//                 city
//             });
    
//             _user.password = await bcrypt.hash(password, 10,)
      
//             // console.log("USER :: ",_user)
      
//             const savedUser = await _user.save();
//             // console.log(savedUser)

//             if(savedUser){
//               const payload = {
//                 id: savedUser.id,
//                 email : savedUser.email
//               }
//               jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : 31556926},(err,token) => {
//                 // return res.status(200).json({status :"success", data : token})
//                 return res.status(201).json({
//                   data :{id: savedUser.id , token:token},
//                   status :"success",
//                   message:"Candidate registered successfully"
              
//               })
//               })
      
//             // return res.status(201).json({
                
//             //  message : "User created successfully",
//             //  data : _user
//             //     })
//             }
      
//           } catch (error) {
//             return res.status(400).json({
//                 message : error
//             });
//           }
//       }

//       exports.CandidateLogin = async (req, res) => {
//         // console.log(req.body);
//         try {
//           const { email, password } = req.body;
//           // Check if user exists
      
//            await candidate.findOne({  email }).then((user) => {
//             // console.log("EMAIL :: ", user)
//             if (!user) {
//               return res.status(400).json({ error: "Invalid email or password" });
//             }
//             bcrypt.compare(password,user.password,function(error,isMatch){
//             //  console.log("MATCH :: ", isMatch)
//               if(isMatch){
//                 const payload = {
//                   id: user.id,
//                   email : user.email
//                 }
//                 jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : 31556926},(err,token) => {
//                   // return res.status(200).json({status :"success", data : token})
//                   return res.status(200).json({data :{id: user.id , token:token}, status :"success",  message:"Login successful"})
//                 })
//               }
//               else{
//                 return res.status(400).json({ error: "Invalid email or password" }); 
//               }
      
//             } )
//            });
//         } catch (error) {
//           console.log(error);
//           res.status(400).json({ error: "Semething Went Wrong" });
//         }
//       };
    
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const candidate = require('../../models/Candidate/candidate');


exports.CandidateLogin =async(req,  res)=>{
  //  console.log(req.body.user.signInUserSession.idToken.jwtToken)
  //  return
  const{ token, family_name, given_name, sub, email }=  req.body;

        try {
          // return res.status(200).json({data :{id: user.id , token:token}, status :"success",  message:"Login successful"})

            const user = await candidate.findOne({ email: email }).exec();
            if(user){
              return res.status(200).json({data :{id: user.id, token:token}, status :"success",  message:"Login successful"})
            }
            
            
            const _user = new candidate({
              first_name :given_name,
              last_name:family_name,
                email,
                sub,
            });
    
            // _user.password = await bcrypt.hash(password, 10,)
      
            // console.log("USER :: ",_user)
      
            const savedUser = await _user.save();
            // console.log(savedUser)

            // if(savedUser){
            //   const payload = {
            //     id: savedUser.id,
            //     email : savedUser.email
            //   }
              // jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : 31556926},(err,token) => {
                // return res.status(200).json({status :"success", data : token})
                return res.status(201).json({
                  data :{id: savedUser.id ,token:token},
                  status :"success",
                  message:"Candidate registered successfully"
              
              })
              
              // })
      
            // return res.status(201).json({
                
            //  message : "User created successfully",
            //  data : _user
            //     })
            // }
      
          } catch (error) {
            return res.status(400).json({
                message : error.message
            });
          }
      }

      // exports.CandidateLogin = async (req, res) => {
      //   // console.log(req.body);
      //   try {
      //     const { email, password } = req.body;
      //     // Check if user exists
      
      //      await candidate.findOne({  email }).then((user) => {
      //       // console.log("EMAIL :: ", user)
      //       if (!user) {
      //         return res.status(400).json({ error: "Invalid email or password" });
      //       }
      //       bcrypt.compare(password,user.password,function(error,isMatch){
      //       //  console.log("MATCH :: ", isMatch)
      //         if(isMatch){
      //           const payload = {
      //             id: user.id,
      //             email : user.email
      //           }
      //           jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : 31556926},(err,token) => {
      //             // return res.status(200).json({status :"success", data : token})
      //             return res.status(200).json({data :{id: user.id , token:token}, status :"success",  message:"Login successful"})
      //           })
      //         }
      //         else{
      //           return res.status(400).json({ error: "Invalid email or password" }); 
      //         }
      
      //       } )
      //      });
      //   } catch (error) {
      //     console.log(error);
      //     res.status(400).json({ error: "Semething Went Wrong" });
      //   }
      // };
    
