const express = require('express');
const cors = require('cors');

const {generateFile} = require('./generateFile');
const {executeCpp} = require('./executeCpp');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get("/",(req,res)=>{
    return res.json({hello: "world!"});
});

app.post("/run",async(req,res)=>{
    const {langugue = "cpp",code} = req.body;
    console.log(langugue, code.length)

    if(code === undefined){
        return res.status(400).json({success: false, error: "Empty code body"})
    }

    try{
    const filepath = await generateFile(langugue,code);
    const output = await executeCpp(filepath);

    return res.json({filepath,output});
    }catch(err){
        res.status(500).json({err});
    }
});

app.listen(5000, ()=>{
    console.log('Listening from 5000')
});