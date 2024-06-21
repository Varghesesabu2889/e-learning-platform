const  TryCatch =(handler)=> {
return async(req,res,next) =>{
    try{
 await handler(req,res,next)
}catch (err) {
    res.status(500).json({
        message: err.message
    })
}
}
}
export default TryCatch