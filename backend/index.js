const express = require('express');

const {generateFile} = require('./generateFile');
const {executeCpp} = require('./executeCpp');

const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get("/",(req,res)=>{
    return res.json({hello: "world!"});
});

app.post("/run",async(req,res)=>{
    const {langugue = "cpp",code} = req.body;

    if(code === undefined){
        return res.status(400).json({success: false, error: "Empty code body"})
    }

    const filepath = await generateFile(langugue,code);
    const output = await executeCpp(filepath);

    console.log(output);

    return res.json({filepath,output});
});

app.listen(5000, ()=>{
    console.log('Listening from 5000')
});