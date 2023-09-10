const USER=require('../models/user')
const {v4:uuidv4}=require('uuid')
const {setUser}=require('../service/auth')

async function handleUserSignUp(req,res){
    const {name,email,password}=req.body;
    await USER.create({
        name:name,
        email:email,
        password:password
    });
    return res.render("home");
}
async function handleUserLogIn(req,res){
    const {email,password}=req.body;
    try {
        const user=await USER.findOne({
            email:email,
            password:password
        });
    } catch (error) {
        console.log(error);
    }
    
    if(!user){
        return res.json({"err":"Invalid email or password"});
    }
    const token=setUser(user);
    res.cookie("uuid",token);
    return res.render("home");
}

module.exports={handleUserSignUp,handleUserLogIn};
