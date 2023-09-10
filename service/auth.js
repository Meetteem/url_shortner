const jwt = require("jsonwebtoken");

const secret="meet"

function setUser(user){
    console.log(user)
    try {
        return jwt.sign({
            _id:user._id,
            email:user.email
        },secret);
    } catch (error) {
        return null
    }
    
}

function getUser(token){
    if(!token) {return null}
    console.log(token);
    const temp=jwt.verify(token,secret);
    console.log
    return temp;
}

module.exports={setUser,getUser};