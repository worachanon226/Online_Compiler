const {exec} = require("child_process")
const path = require("path")
const fs = require("fs")

const outputPath = path.join(__dirname,"outputs")
if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true})
}

const executeCpp = (filePath) =>{
    const jobId = path.basename(filePath).split(".")[0]
    const outPath = path.join(outputPath,`${jobId}.exe`)
    return new Promise((resolve,rejects) => {
        exec(`g++ ${filePath} -o ${outPath} && ${outputPath}/${jobId}.exe`,
        (error,stdout,stderr) => {
            error &&  rejects({error,stderr})
            stderr && rejects(stderr)
            resolve(stdout)
        })
    })
}
module.exports = {
    executeCpp
}