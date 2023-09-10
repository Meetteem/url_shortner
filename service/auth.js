const sessionIdToUserMap=new Map();

function setUser(id,user){
    sessionIdToUserMap.set(id,user);
}

function getUser(id){
    console.log(id);
    console.log(sessionIdToUserMap);
    return sessionIdToUserMap.get(id);
}

module.exports={setUser,getUser};