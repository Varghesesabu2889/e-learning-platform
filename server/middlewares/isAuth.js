import jsonwebtoken from "jsonwebtoken";
import User from "../models/userModel.js";  

export const isAuth = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
          return res.status(403).json({
            message: "Please Login",
            success: false
            });

          
        }
        else{
          const decodedData = jsonwebtoken.verify(token, process.env.Jwt_Secret);

        req.user = await User.findById(decodedData._id);
    
        next();
  
   
      
    }
  }
  //  return res.status(500).json({
  //       message: "",
  //         });
  //       }
        


  //     req.user = await User.findById(decodedData._id);  
//   try {
//     const token = req.headers.token;
//     if (!token) {
//       return res.status(403).json({
//         message: "Please Login",
//       });
//     }
//    
//   } catch (err) {
//     res.status(500).json({
//       message: "Login first",
//     });
//   }
// };




export const isAdmin = (req,res,next)=>{
  try {
    if(req.user.role !== "admin")
      return res.status(403).json({
    message: "Only admin can access this route",
      })
      next()
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}