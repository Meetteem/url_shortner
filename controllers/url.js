const ShortUniqueId=require('short-unique-id')
const { randomUUID } = new ShortUniqueId({ length: 10 });

const URL=require('../models/url')
async function handleGenerateNewShortURL(req,res){
    const b=req.body;
    if(!b.url) return res.status(400).json({"Error":"No URl"});
    const shortID=randomUUID();
    await URL.create({
        shortId:shortID,
        redirectUrl:b.url,
        visitHistory:[],
        createdBy:req.user._id
    });
    return res.render("home",{shortID});
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    try {
        const entry = await URL.findOne({shortId});
    } catch (error) {
        console.log(error)
    }
   
    return res.json({
        "Clicks":entry.visitHistory.length,
        "analytics":entry.visitHistory})
}

module.exports={handleGenerateNewShortURL,handleGetAnalytics};