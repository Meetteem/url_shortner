const {getUser}=require('../service/auth');

async function restrictToLoggedinUserOnly(req,res,next){
    const userUid=req.cookies.uuid;
    
    if(!userUid){
        return res.render("login");
    }
    const user=getUser(userUid);
    console.log("USer: ",user);
    if(!user) return res.render("login");

    req.user=user;
    next();

}
async function checkAuth(req,res,next){
    const userUid=req.cookies.uuid;
    const user=getUser(userUid);
    console.log("USer: ",user);
    req.user=user;
    next();

}

module.exports={restrictToLoggedinUserOnly,checkAuth};