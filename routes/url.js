const express=require('express')
const router=express.Router();
const {handleGenerateNewShortURL,handleGetAnalytics}=require('../controllers/url')
const URL=require('../models/url')
router.post('/',handleGenerateNewShortURL);
router.get('/analytics/:shortId',handleGetAnalytics);
router.get('/:shortId',async (req,res)=>{
	const shortId=req.params.shortId
		const entry = await URL.findOneAndUpdate({shortId},{
			$push :{
			 visitHistory:{
				timestamp:Date.now()
			 }
			}
		})
	
	if(!entry.redirectUrl){
		console.log("Null");
	}
	else{
	res.redirect(entry.redirectUrl);
	}
})
module.exports = router;