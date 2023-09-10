const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const path=require('path')
const {restrictToLoggedinUserOnly,checkAuth}=require('./middleware/auth')

const dotenv = require("dotenv")
dotenv.config();

const PORT=8001;
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.d9dv9cl.mongodb.net/?retryWrites=true&w=majority`;

const URL=require('./models/url');
const staticRoute=require('./routes/staticRouter')

app.use(express.json()); 
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

const {connectToMongoDB} = require('./connect');

app.listen(PORT,()=>{
	connect();
	console.log(`Server listening on ${PORT}`);
})
async function connect(){
	
	try{
	   await connectToMongoDB(uri);
	}
	catch(err){
		console.log(err)
	}

}
app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'))

const urlRoute=require('./routes/url');
app.use('/url',restrictToLoggedinUserOnly,urlRoute);

const userRoute=require('./routes/user');
app.use('/user',userRoute);

app.use('/',checkAuth,staticRoute);

app.get('/test',async (req,res)=>{
	const allUrls= await URL.find({});
	return res.render("home",{
		urls:allUrls
	});
})
