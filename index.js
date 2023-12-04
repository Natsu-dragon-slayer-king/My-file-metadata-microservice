const express = require("express");
const app = express();
require("dotenv").config()

app.use("/public", express.static(__dirname + "/public"));

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

app.get("/",(req,res)=>{
	res.sendFile(__dirname + "/views/index.html");
})

const multer = require("multer");
const upload = multer({ 
	dest: 'uploads/'
});

app.post('/file-input', upload.single("file"), function (req, res, next){
	if(!req.file){
		res.json({
			message:"You have to input a file"
		})
	}else{
 		res.json({
 			name:req.file.originalname,
 			type:req.file.mimetype,
 			size:req.file.size
 		})
 	}
})

app.listen(process.env["PORT"] || 3000, ()=>{
	console.log("You're up and running sir");
})
