const fs = require("fs");

const coffeeName = {
  DR: "dark-roast",
  MR: "medium-roast",
  B: "blonde",
};

const viewAllSupply = (coffeeType) => {
  if (!Object.keys(coffeeName).includes(coffeeType)) {
    return Promise.reject("Invalid coffee type. Must be DR, MR, or B.");
  }

  return new Promise((resolve, reject) => {
    fs.readFile("supply.txt", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const result = data.split("\n");
        let count = 0;
        for (const line of result) {
          if (line === coffeeName[coffeeType]) {
            count++;
          }
        }
        resolve(count);
      }
    });
  });
};

const addSupply = (coffeeType) => {
  if (!Object.keys(coffeeName).includes(coffeeType)) {
    return Promise.reject("Invalid coffee type. Must be DR, MR, or B.");
  }

  return new Promise((resolve, reject) => {
    fs.appendFile("supply.txt", `\n${coffeeName[coffeeType]}`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`${coffeeType} coffee added to file`);
      }
    });
  });
};

const deleteSupply = (coffeeType, quantity) => {
    if (!Object.keys(coffeeName).includes(coffeeType)) {
      return Promise.reject("Invalid coffee type. Must be DR, MR, or B.");
    }
  
    return new Promise((resolve, reject) => {
      fs.readFile("supply.txt", "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          const result = data.split("\n");
          let remainingCoffee = [];
          for (const line of result) {
            if (line === coffeeName[coffeeType]) {
              if (quantity === "*") {
                continue;
              } else if (quantity > 0) {
                quantity--;
                continue;
              }
            }
            if (line !== "") {
              remainingCoffee.push(line);
            }
          }
          if (quantity === "*") {
            remainingCoffee = remainingCoffee.filter(
              (line) => line !== coffeeName[coffeeType]
            );
          }
          fs.writeFile("supply.txt", remainingCoffee.join("\n"), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(`${coffeeType} coffee removed from file`);
            }
          });
        }
      });
    });
  };
  

viewAllSupply("B")
  .then((msg) => console.log(msg)) // 5
  .then(() => addSupply("B"))
  .then((msg) => console.log(msg)) // "B coffee added to file"
  .then(() => viewAllSupply("B"))
  .then((msg) => console.log(msg)) // 6
  .then(() => deleteSupply("B", 2))
  .then((msg) => console.log(msg)) // "B coffee removed from file"
  .then(() => viewAllSupply("B"))
  .then((msg) => console.log(msg)) // 4
  .catch((err) => console.log(err))
  .finally(() => {console.log("Program is completed")});


