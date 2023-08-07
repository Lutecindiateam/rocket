const Admin = require("../../models/Admin/Auth")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');


exports.AdminLogin = async (req, res) => {
    // console.log(req.body);
    try {
        const { email, sub, name, token } = req.body

        const user = await Admin.findOne({ email: email }).exec();
        if (user) {
            return res.status(200).json({ data: { id: user.id, token: token }, status: "success", message: "Admin Login successful" })
        }
        const save = await Admin.create({ email, name, sub });
        return res.status(200).json({ data: { id: save.id, token: token }, status: "success", message: "Admin Login successful" })

    } catch (error) {
        console.log(error.message);
    }
}

// exports.AdminLogin = async (req, res) => {
//     console.log(req.body);
//     try {
//         const { email, password } = req.body;
//         // Check if user exists
//         //   console.log(req.body);
        // await Admin.findOne({ email }).then((user) => {
        //     // console.log("EMAIL :: ", user)
        //     if (!user) {
        //         return res.status(400).json({ error: "Invalid email or password" });
        //     }
//             bcrypt.compare(password, user.AdminPass, function (error, isMatch) {
//                 //  console.log("MATCH :: ", isMatch)
//                 if (isMatch) {
//                     const payload = {
//                         id: user.id,
//                         email: user.email
//                     }
//                     jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 31556926 }, (err, token) => {
//                         // return res.status(200).json({status :"success", data : token})
//                         return res.status(200).json({ data: { id: user.id, token: token }, status: "success", message: "Admin Login successful" })
//                     })
//                 }
//                 else {
//                     return res.status(400).json({ error: "Invalid email or password" });
//                 }

//             })
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ error: "Semething Went Wrong" });
//     }
// };

