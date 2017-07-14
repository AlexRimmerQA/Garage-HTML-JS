"use strict";

//car add KPN41DF Ferarri Wheels Window Engine

let inGarageCarList = [];
let outGarageCarList = [];

//Function to parse the command line text and then do the appropriate function calls.
function parseCommandLine(e) {
	if(e.keyCode === 13) { // Enter Key
		e.preventDefault();
		let commandLine = document.getElementById("commandLine");
		
		//If the commandline exists and it has a value within it.
		if(commandLine && commandLine.value != false) {
			let outputText = ""; // text to be output after each command has been executed, either success or failure message.
			//else if garage, check next word, if checkin, the next word should be a registration num, else if checkout, same situation, else if cost, same situation, else if output then output all the cars in garage.
			//else if help, large alert for the commands.
			let command = commandLine.value.toLowerCase().split(" ");
			switch(command[0]) { // check the first part of the command
				case "car": // if the command starts with car
					if(command[1] && command[2] && command[3] && command[1] == "add") { // verify that they have the minumum requirements for the command and they selected a command "add"
						let registrationNum = command[2];
						let carName = command[3];
						let carFaults = [];
						// command[4] onwards are all faults, add them to the fault list
						if(command[4]) { 
							for(let i = 4; i < command.length; i++) {
								carFaults[carFaults.length] = command[i];
							}
						}
						//Try and create the car and output what the result of that was.
						if(createCarCmd(registrationNum, carName, carFaults)) {
							outputText = `Car: ${registrationNum} was created`;
						} else {
							outputText = `There was a problem registering Car: ${registrationNum}`;
						}
					}
					else { // if there was a problem with the rest of the command, inform the user.
						outputText = "There was a problem with the command entered";
					}
					break;
				case "garage": // if the command starts with garage
					if(command[1]) {
						if(command[1] == "checkin") {
							if(addCarGarageCmd(command[2])) {
								outputText = `Car: ${command[2]} was checked into the garage`;
							} else {
								outputText = `Could not find Car: ${command[2]}`;
							}
						} else if(command[1] == "checkout") {
							if(removeCarGarageCmd(command[2])) {
								outputText = `Car: ${command[2]} was checked out of the garage`;
							} else {
								outputText = 'There was a problem processing your command, please try again';
							}
						} else if(command[1] == "cost") {
							let cost = calcCarCostCmd(command[2]);
							if(cost) {
								outputText = `Car: ${command[2]} will cost ${cost}`;
							} else {
								outputText = 'There was a problem processing your command, please try again';
							}
						} else if(command[1] == "output") {
							outputText = outputGarageCarsCmd();
						} else {
							outputText = "There was a problem with the command entered";
						}
					}
					break;
				case "help": // if the command starts with help
					outputText = "car add REGNO NAME FAULT1 FAULT2 FAULT3 ... " + "\n" + "-- Adds a car to the list of cars on record" + "\n" + "garage checkin|checkout|cost REGNO " + "\n" + "-- Check in out cars with the garage or check the cost to repair the car" + "\n" + "garage output " + "\n" + "-- List all the cars currently in the garage";
					break;
				default: // if it doesnt recognise the start of the command
					outputText = "Unrecognised command. Type 'help' for commands";
					break;
			}
			commandLine.value = ""; // Empty the command line once the command has been entered.
			document.getElementById("commandOutput").innerHTML = outputText;
		}
		else {
			alert("There was a problem with the command.");
		}
	}
}

//commandLine version
function calcCarCostCmd(reg) {
	let match;
	for(let i = 0; i < inGarageCarList.length; i++) {
		if(inGarageCarList[i].reg == reg) {
			match = inGarageCarList[i];
			break;
		}
	}
	if(match) {
		let baseCost = 100;
		switch(match.name.toLowerCase()) {
			case "ferrari":
				baseCost *= 10;
				break;
			case "pergeot":
				baseCost *= 4;
				break;
			case "audi":
				baseCost *= 5;
				break;
			case "bugatti":
				baseCost *= 12;
				break;
			case "ford":
				baseCost *= 1;
				break;
			default:
				break;
		}
		baseCost *= match.faults.length;
		return baseCost;
	}
	else {
		return false;
	}
}

function calcCarCost() {
	let carReg = document.getElementById("carReg");
	let cost = calcCarCostCmd(carReg.value);
	if(cost) {
		let newDiv = document.getElementById("garageCarCost");
		if(newDiv) {
			newDiv.innerHTML = "";
		}
		else {
			let garageDiv = document.getElementById("garageControl");
			newDiv = document.createElement("DIV");
			newDiv.setAttribute("id", "garageCarCost");
			newDiv.setAttribute("style", "margin:2%;");
			garageDiv.append(newDiv);
		}
		newDiv.innerHTML += `Cost for car:'${carReg}' will be ${baseCost}`;
	} else {
		alert(`Could not locate car:${carReg} in the garage, please verfiy the registration of the car.`);
	}
}

function createCarCmd(reg, name, faults) {
	outGarageCarList[outGarageCarList.length] = {"reg":reg, "name":name, "faults":faults};
	return true;
}

function createCar() {
	let registration = document.getElementById("carReg").value;
	let name = document.getElementById("carName").value;
	let faultsList = document.getElementById("carFaults").value.split(",");
	
	if(createCarCmd(registration, name, faultsList)) {
		alert(`Created car: Reg: ${registration}, Name: ${name}, Faults: ${faultsList}`);
		return true;
	} else {
		alert(`There was a problem creating Car: ${registration}`);
		return false;
	}
}

function addCarGarageCmd(reg) {
	let match;
	for(let i = 0; i < outGarageCarList.length; i++) {
		if(outGarageCarList[i].reg == reg) {
			match = outGarageCarList.splice(i, 1)[0];
			break;
		}
	}
	if(match) {
		inGarageCarList[inGarageCarList.length] = match;
		return true;
	}
	else {
		return false;
	}
}

function addCarGarage() {
	let carReg = document.getElementById("garageInputReg").value;
	if(addCarGarageCmd(carReg)) {
		alert(`Car: ${carReg} has been checked into the garage`);
		return true;
	} else {
		alert("Could not find a car with the specified registration.\nPlease add the car before checking it in.");
		return false;
	}
}

function removeCarGarageCmd(reg) {
	let match;
	for(let i = 0; i < inGarageCarList.length; i++) {
		if(inGarageCarList[i].reg == reg) {
			match = inGarageCarList.splice(i, 1)[0];
			break;
		}
	}
	if(match) {
		outGarageCarList[outGarageCarList.length] = match;
		return true;
	}
	else {
		return false;
	}
}

function removeCarGarage() {
	let carReg = document.getElementById("carReg").value;
	if(removeCarGarageCmd(carReg)) {
		alert(`Car: ${carReg} has been checked out of the garage`);
		return true;
	} else {
		alert("Could not find a car with the specified registration.\nPlease verify the registration and try again.");
		return false;
	}
}

function outputGarageCarsCmd() {
	let outputText = "Cars in garage: <br>";
	for(let i = 0; i < inGarageCarList.length; i++) {
		outputText += inGarageCarList[i].reg + ", ";
		outputText += inGarageCarList[i].name;
		for(let j = 0; j < inGarageCarList[i].faults.length; j++) {
			outputText += ", "; 
			outputText += inGarageCarList[i].faults[j];
		}
		outputText += "<br>";
	}
	return outputText;
}

function outputGarageCars() {
	let newDiv = document.getElementById("garageContent");
	if(newDiv) {
		newDiv.innerHTML = "";
	}
	else {
		let garageDiv = document.getElementById("garageControl");
		newDiv = document.createElement("DIV");
		newDiv.setAttribute("id", "garageContent");
		newDiv.setAttribute("style", "margin:2%;");
		garageDiv.append(newDiv);
	}
	newDiv.innerHTML = outputGarageCarsCmd();
}