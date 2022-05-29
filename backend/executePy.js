const {exec} = require("child_process")

const executePy = (filePath) =>{
    return new Promise((resolve,rejects) => {
        exec(`python ${filePath}` ,
        (error,stdout,stderr) => {
            error &&  rejects({error,stderr})
            stderr && rejects(stderr)
            resolve(stdout)
        })
    })
}
module.exports = {
    executePy
}