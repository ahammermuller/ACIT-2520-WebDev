const fs = require("fs");
const EOL = require("os").EOL;

const menuPromise = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.split(EOL));
      }
    });
  });
};

const mealsDict = (data) => {
  const meals = {};
  data.forEach(item => {
    const [mealType, name, quantity, price] = item.split(",");
    const mealObj = {name, quantity, price};
    if (mealType in meals){
      meals[mealType].push(mealObj);
    } else {
      meals[mealType] = [mealObj];
    }
  });
  return meals;
};

const stringFormat = (meals) => {
  let formattedString = "";
  for (const key in meals){
    const mealsArr = meals[key];
    const mealTitle = key[0].toUpperCase() + key.slice(1);
    formattedString += `*** ${mealTitle} items ***${EOL}`;
    mealsArr.forEach(m => {
      formattedString += `${m.price} ${m.name}, ${m.quantity}${EOL}`;  
    });
  }
  return formattedString;
};

const writeFile = (data) => {
  fs.writeFile("menu.txt", data, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Content saved");
    }
  });
};

menuPromise("menu.csv")
  .then(mealsDict)
  .then(stringFormat)
  .then(writeFile)
  .catch((err) => console.log(err))
