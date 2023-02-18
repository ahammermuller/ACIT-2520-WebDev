const fs = require ("fs");
const path = require ("path");


const filterFiles = (pathDir, fileExt, callBack) => {
    fs.readdir(pathDir, (err, files) => {
        if (err){
            console.log(err);
        }else{
            result = []
            files.forEach(file => {
                if (path.extname(file) == fileExt) {
                    result.push(file) 
                }
            });
        }
        callBack(null, result);
    });
}


module.exports = {filterFiles}