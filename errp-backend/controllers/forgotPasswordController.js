const User=require('../data/User');
const nodemailer = require('nodemailer');
const bcrypt=require("bcrypt")
const crypto=require("crypto")
// Create a transporter object
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: 'nuysanbarorodev@gmail.com',
    pass: process.env.PASSWORD,
  }
});

const handleforgot= async (req, res) => {
  const email = req.body.email;
  const hash = crypto.randomBytes(16).toString('hex');
  console.log(email,hash)
  // Save the hash in the database
  const user=await User.findOne({ "email":email }).exec();
  if(user){

  // Send the password reset link to the user's email
    user.passwordResetHash=hash
    user.save()
    const link = `http://localhost:3000/resetPassword?email=${email}&hash=${hash}`;
  // Create a message object
    const message = {
        from: 'nuysanbarorodev@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `Click here to reset your password at ERRP: ${link}`,
    };
    
    // Send the email
    transporter.sendMail(message, (err, data) => {
        if (err) {
        console.log(err);
        } else {
        console.log('Email sent successfully!');
        }
    });
    res.status(200).send();
  }else{
    res.status(404).json({"message":"account with this email address is not available"})
  }
};
const handleReset=async (req, res) => {
    const email = req.query.email;
    const identifier = req.query.hash;
    const password = req.body.password;
    console.log(email,identifier)
    const user = await User.findOne({ email:email }).exec();
    if (!user) {
      return res.status(404).json({"message":'User not found'});
    }
    console.log(user)
    if (user.passwordResetHash !== identifier) {
      return res.status(403).json({"message":'Invalid identifier'});
    }
    const hashedPwd= await bcrypt.hash(password,10);
    user.password = hashedPwd;
    await user.save();
  
    res.status(200).json({"message":'Password reset successful'});
  }
module.exports={handleforgot,handleReset}