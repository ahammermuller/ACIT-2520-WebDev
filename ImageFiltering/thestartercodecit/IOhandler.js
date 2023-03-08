/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: March 01, 2023
 * Author: Aline Hammermuller
 *
 */


const unzipper = require("unzipper"),
  {createReadStream, createWriteStream} = require("fs"),
  PNG = require("pngjs").PNG,
  fsp = require("fs").promises,
  path = require("path");
  const { pipeline} = require("stream");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */

const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    pipeline(
      createReadStream(pathIn),
      unzipper.Extract({path: pathOut}),
      (err) => {
        if (err) {
          console.log(err);
          reject(err);
        }
      }
    ).on('close', () => {
      resolve('Extraction operation complete');
    });
  });
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */

const readDir = (dir) => {
  console.log('Reading directory:', dir);
  return new Promise((resolve, reject) => {
    fsp.readdir(dir)
      .then((all_files) => {
        const png_files = all_files.filter(file => path.extname(file) === '.png');
        resolve(png_files);
      })
      .catch((err) => {
        console.error('Error reading directory:', dir);
        reject(err);
      });
  });
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */

const grayScale = (pathIn, pathOut) => {
  console.log("grayScale function called with pathIn:", pathIn, "and pathOut:", pathOut);
  return new Promise((resolve, reject) => {
    createReadStream(pathIn)
      .pipe(
        new PNG({
          filterType: 4,
        })
      )
      .on("parsed", function () {
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;

            // invert color
            const R = this.data[idx], G=this.data[idx+1], B=this.data[idx+2];
            const gray = (R + G + B) / 3;
            this.data[idx] = gray;
            this.data[idx + 1] = gray;
            this.data[idx + 2] = gray;

            // reduce opacity
            this.data[idx + 3] = this.data[idx + 3] >> 1;
          }
        }

        this.pack().pipe(createWriteStream(pathOut))
          .on('finish', () => {
            resolve();
          })
          .on('error', (error) => {
            reject(error);
          });
      });
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
