


const square = (x1,x2,y1,y2) => {
    return ((x2-x1)*(x2-x1))+((y2-y1)*(y2-y1))
};

const squareRoot = (x1,x2,y1,y2) => {
    return Math.sqrt(square(x1,x2,y1,y2))
};

const distance = (x1,x2,y1,y2) => {
    return squareRoot(x1,x2,y1,y2)
};

module.exports = {distance}





// const processInput = (x1, y1, x2, y2) => {
    
//     if (!fs.existsSync("./dataPoints/")) {
//         fs.mkdir("DataPoints", (err) => {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 console.log("Folder was created!")
//             }
//         });
//     }
// };