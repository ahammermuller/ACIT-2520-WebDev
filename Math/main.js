const fs = require("fs");
const math = require("./mathHelpers");
const process = require("process");
userInput = process.argv


const processInput = (x1, y1, x2, y2) => {
    

    fs.mkdir("DataPoints", (err) => {
        if (err) {
            console.log("Directory already exist");
        } else {
            console.log("Directory created.")
        }
    });

    const distance = math.distance(x1, y1, x2, y2)
    const text = `\nThe distance between your two points: (${x1} , ${y1}) , (${x2} , ${y2}) is ${distance}`
    fs.appendFile("./dataPoints/points.txt", text, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Content saved")
        }
    });
};

processInput(userInput[2], userInput[3], userInput[4], userInput[5])
