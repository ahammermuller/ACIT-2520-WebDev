const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description: Program to filter images using node
 *
 * Created Date: March 01, 2023
 * Author: Aline Hammermuller
 *
 */

const {unzip, readDir, grayScale} = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

const processFile = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await unzip(zipFilePath, pathUnzipped);
        const files = await readDir(pathUnzipped);
        for (const file of files) {
          await grayScale(path.join(pathUnzipped, file), path.join(pathProcessed, file));
        }
        resolve(console.log("All tasks completed successfully."));
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  };
  
  processFile()
    .catch((err) => console.error(err));