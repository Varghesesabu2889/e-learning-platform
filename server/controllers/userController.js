// Import statements
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendMail, { sendForgotMail } from '../middlewares/sendMail.js';
import TryCatch from '../middlewares/TryCatch.js';


// Register function definition
export const register = TryCatch(async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      message: "User Already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  user = {
    name,
    email,
    password: hashPassword,
  };

  const otp = Math.floor(Math.random() * 10000);

  const activationToken = jwt.sign(
    {
      user,
      otp,
    },
    process.env.Activation_Secret,
    {
      expiresIn: "2m",
    }
  );

  const data = {
    name,
    otp,
  };

  await sendMail(email, "Skill Academy", data);

  res.status(200).json({
    message: "Please check your email for OTP",
    activationToken,
  });
});

// VerifyUser function definition
export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;

  let verify;
  try {
    verify = jwt.verify(activationToken, process.env.Activation_Secret);
  } catch (err) {
    return res.status(400).json({
      message: "Otp Expired",
    });
  }

  if (verify.otp !== otp) {
    return res.status(400).json({
      message: "Invalid Otp",
    });
  }

  await User.create({
    name: verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
  });

  res.json({
    message: "User Register Successfully",
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "No User with this email",
    });
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return res.status(400).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign({ _id: user._id }, process.env.Jwt_Secret, {
    expiresIn: "15d",
  });

  res.json({
    message: `Welcome back ${user.name}`,
    token,
    user,
  });
});

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({
    user,
  });
});
export const forgotPassword = TryCatch(async(req,res)=>{
  const {email}=req.body;
  const user=await User.findOne({email});
  if(!user){
    return res.status(400).json({message:"No user with this email"}
      );
      }
      const token=jwt.sign({email},process.env.Forgot_Secret);

      const data = {email,token}

      await sendForgotMail("Skill Academy",data);

      user.resetPasswordExpire = Date.now() + 5 * 60 *1000;

      await user.save();
      res.json({
        message:"Reset Password sent to your email",
      })
})
export const resetPassword = TryCatch(async(req,res)=>{
  const decodedData = jwt.verify(req.query.token,process.env.Forgot_Secret)

  const user = await User.findOne({email:decodedData.email })
  if(!user){
    return res.status(404).json({
      message:"No user with this email"
      })}
      if(user.resetPasswordExpire === null)
        return res.status(400).json({message:"Token expired"
      })
      if(user.resetPasswordExpire < Date.now()){
        return res.status(400).json({message:"Token expired"
        })
      }
      const password = await bcrypt.hash(req.body.password,10)

      user.password =  password

      user.resetPasswordExpire = null

      await user.save();
      res.json({message:"Password reset successfully"})
})
