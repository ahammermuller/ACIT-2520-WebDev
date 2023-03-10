const rect = require("./rectangle");

let solveRect = (l, b) => {
  console.log("Solving for rectangle with l = " + l + " and b = " + b);
  rect(l, b, (err, rectangle) => {
    if (err) {
      console.log("ERROR: ", err.message);
    } else {
      console.log(
        "The area of the rectangle of dimensions l = " +
          l +
          " and b = " +
          b +
          " is " +
          rectangle.area()
      );
      console.log(
        "The perimeter of the rectangle of dimensions l = " +
          l +
          " and b = " +
          b +
          " is " +
          rectangle.perimeter()
      );
    }
  });
  console.log("This statement after the call to rect()");
};

//solveRect(12, 2)

//solveRect(40, 12)

solveRect(12, -2)