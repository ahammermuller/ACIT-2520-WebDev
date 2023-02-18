const {filterFiles} = require("./lab3module")
const process = require("process");
userInput = process.argv

const listOfFiles = (pathDir, fileExt) => {
    filterFiles(pathDir, fileExt, (err,files) => {
        if(err){
            return console.log(err);
        }
        console.log(files)
    })
}


listOfFiles(userInput[2], userInput[3])