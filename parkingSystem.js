// Level One for Bus or Truck, create Array of 30 lots numbered 10 to 39
// For simplicity and testing sake, we only declare 3 lots in array
let levelOne = Array.from(new Array(3), (x, i) => i + 10);

// Level Two for Motorcycles or Car, create Array of 30 lots numbered 49 to 69
// For simplicity and testing sake, we only declare 3 lots in array
let levelTwo = Array.from(new Array(3), (x, i) => i + 40);

// Level Two for Motorcycles or Car, create Array of 30 lots numbered 70 to 99
// For simplicity and testing sake, we only declare 3 lots in array
let levelThree = Array.from(new Array(3), (x, i) => i + 70);

let questions = [
  "(1) Entry or Exit? (Input either Entry or Exit)",
  "(2) Vehicle Number? (Input your Vehicle Number)",
  "(3) Vehicle Type? (Eg. Car, Motorcycle, Bus or Truck)"
];

let answers = [];

function ask(i) {
  process.stdout.write(`\n${questions[i]}`);
  process.stdout.write(" > ");
}

process.stdin.on("data", function(data) {
  answers.push(
    data
      .toString()
      .toLowerCase()
      .trim()
  );

  if (answers.length < questions.length) {
    ask(answers.length);
  } else {
    process.stdout.write("\n\n");
    process.stdout.write(
      `You've enter: ${answers[0].toUpperCase()} ${answers[2].toUpperCase()} ${answers[1].toUpperCase()}`
    );
    process.stdout.write("\n\n");
    if (answers[0] === "entry") entry(answers[2], answers[1]);
    else if (answers[0] === "exit") exit(answers[1]);
    else console.log("Invalid input! For Q(1), enter 'Entry' or 'Exit' only\n\n");
    answers = [];
    ask(0);
  }
});

ask(0);

function entry(vehicleType, vehicleNumber) {
  let allCarParkLots = levelOne.concat(levelTwo, levelThree);
  let occupiedLots = allCarParkLots.filter(lot => typeof lot === "object");
  let proceedToParkVehicle = true;

  occupiedLots.forEach(vehicle => {
    if (vehicle.vehicleNumber === vehicleNumber.toString()) {
      console.log("Invalid Vehicle Number");
      proceedToParkVehicle = false;
      //throw new Error("Invalid Vehicle Number");
    }
  });

  let levelOneFull = levelOne.every(lot => typeof lot === "object");
  let levelTwoFull = levelTwo.every(lot => typeof lot === "object");
  let levelThreeFull = levelThree.every(lot => typeof lot === "object");

  let validTypeBus = vehicleType.toLowerCase() === "bus";
  let validTypeTruck = vehicleType.toLowerCase() === "truck";
  let validTypeCar = vehicleType.toLowerCase() === "car";
  let validTypeMotorcycle = vehicleType.toLowerCase() === "motorcycle";

  if (levelOneFull && levelTwoFull && levelThreeFull) {
    console.log("Carpark is full!");
    proceedToParkVehicle = false;
    //throw new Error("Carpark full");
  }

  if (
    !(validTypeBus || validTypeTruck || validTypeCar || validTypeMotorcycle)
  ) {
    console.log("Invalid vehicle type");
    proceedToParkVehicle = false;
    //throw new Error("Invalid vehicle type");
  }

  if (proceedToParkVehicle && (validTypeBus || validTypeTruck)) {
    if (levelOneFull) {
      console.log("Level 1 parking for Buses & Trucks are full");
      return;
      //throw new Error("Level 1 parking for Buses & Trucks are full");
    }
    let carpark = levelOne;
    let occupiedLotNumber = findParkingLot(vehicleType, vehicleNumber, carpark);
    console.log(`Please proceed to Level 1, spot ${occupiedLotNumber}`);
  } else if (proceedToParkVehicle && (validTypeCar || validTypeMotorcycle)) {
    // if (levelTwoFull && levelThreeFull) {
    //   console.log("Level 2 & 3 parking for Motorcycles & Cars are full");
    //   return;
    //   //throw new Error("Level 2 & 3 parking for Motorcycles & Cars are full");
    // }
    let carparkLevel = levelTwoFull ? levelThree : levelTwo;
    let directToLevel = levelTwoFull ? 3 : 2;
    let occupiedLotNumber = findParkingLot(
      vehicleType,
      vehicleNumber,
      carparkLevel
    );
    console.log(
      `Please proceed to Level ${directToLevel}, spot ${occupiedLotNumber}`
    );
  }
}

function findParkingLot(vehicleType, vehicleNumber, carpark) {
  let findingLot = true;
  let occupiedLotNumber = "";
  carpark.forEach((lot, index, carpark) => {
    if (typeof lot === "number" && findingLot) {
      let vehicle = {
        lotNumber: lot,
        vehicleType: vehicleType,
        vehicleNumber: vehicleNumber
      };

      carpark.splice(index, 1, vehicle); // remove number from array and replace with object
      findingLot = false;
      occupiedLotNumber = vehicle.lotNumber;
    }
  });
  return occupiedLotNumber;
}

function exit(vehicleNumber) {
  let allParkingLot = levelOne.concat(levelTwo, levelThree);
  let soonToBeEmptyLot = allParkingLot.filter(
    lot => lot.vehicleNumber === vehicleNumber.toString()
  );
  let lotNumber = soonToBeEmptyLot[0].lotNumber;

  if (lotNumber < 40) {
    let index = clearedParkingLot(levelOne, lotNumber);
    console.log(`Level 1, spot ${lotNumber} is now available`);
  } else if (lotNumber < 70) {
    let index = clearedParkingLot(levelTwo, lotNumber);
    console.log(`Level 2, spot ${lotNumber} is now available`);
  } else {
    let index = clearedParkingLot(levelThree, lotNumber);
    console.log(`Level 3, spot ${lotNumber} is now available`);
  }
}

function clearedParkingLot(carparkLevel, lotNumber) {
  let index = carparkLevel.findIndex(lot => lot.lotNumber === lotNumber);
  carparkLevel.splice(index, 1, lotNumber); //remove object and replace with a number
}

module.exports = { entry, exit, findParkingLot, clearedParkingLot };
