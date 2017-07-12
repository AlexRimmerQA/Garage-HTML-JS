"use strict";

class Car {
	constructor(reg, name, faults) {
		this.reg = reg;
		this.name = name;
		this.faults = faults;
	}
}

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
			switch(command[0]) // check the first part of the command
			{
				case "car": // if the command starts with car
					if(command[1] && command[2] && command[3] && command[1] === "add") { // verify that they have the minumum requirements for the command and they selected a command "add"
						let registrationNum = command[2];
						let carName = command[3];
						let carFaults = [];
						
						if(command[4]) { // command[4] onwards are all faults, add them to the fault list
							for(int i = 4; i < command.length; i++) {
								carFaults[carFaults.length] = command[i];
							}
						}
						
						//Try and create the car and output what the result of that was.
						if(createCar(registrationNum, carName, carFaults)) {
							outputText = 'Car: ${registrationNum} was created';
						} else {
							outputText = 'There was a problem registering Car: ${registrationNum}';
						}
					}
					else { // if there was a problem with the rest of the command, inform the user.
						outputText = "There was a problem with the command entered";
					}
					break;
				case "garage": // if the command starts with garage
					
					break;
				case "help": // if the command starts with help
					alert("car add REGNO NAME FAULT1 FAULT2 FAULT3 ... " + "\n" + "-- Adds a car to the list of cars on record" + "\n" + "garage checkin|checkout|cost REGNO " + "\n" + "-- Check in out cars with the garage or check the cost to repair the car" + "\n" + "garage output " + "\n" + "-- List all the cars currently in the garage");
					break;
				default: // if it doesnt recognise the start of the command
					alert("Unrecognised command. Type 'help' for commands");
					break;
			}
			commandLine.value = ""; // Empty the command line once the command has been entered.
		}
		else {
			alert("There was a problem with the command.");
		}
	}
}

function calcCarCost() {
	let carReg = document.getElementById("carReg").value;
	let match;
	for(let i = 0; i < inGarageCarList.length; i++) {
		if(inGarageCarList[i].reg == carReg) {
			match = inGarageCarList[i];
			break;
		}
	}
	if(match) {
		let baseCost = 100;
		switch(match.name) {
			case "Ferrari":
				baseCost *= 10;
				break;
			case "Pergeot":
				baseCost *= 4;
				break;
			case "Audi":
				baseCost *= 5;
				break;
			case "Bugatti":
				baseCost *= 12;
				break;
			case "Ford":
				baseCost *= 1;
				break;
		}
		baseCost *= match.faults.length;
		
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
	}
	else {
		alert('Could not locate car:${carReg} in the garage, please verfiy the registration of the car.');
	}
}

function createCar() {
	let registration = document.getElementById("carReg").value;
	let name = document.getElementById("carName").value;
	let faultsList = document.getElementById("carFaults").value.split(",");
	
	if(createCar(registration, name, faultsList)) {
		alert(`Created car: Reg: ${registration}, Name: ${name}, Faults: ${faultsList}`);
	} else {
		alert(`There was a problem creating Car: ${registration}`);
	}
}

function createCar(reg, name, faults) {
	outGarageCarList[outGarageCarList.length] = {"reg":registration, "name":name, "faults":faultsList};
}

function addCarGarage() {
	let carReg = document.getElementById("garageInputReg").value;
	let match;
	for(let i = 0; i < outGarageCarList.length; i++) {
		if(outGarageCarList[i].reg == carReg) {
			match = outGarageCarList.splice(i, 1)[0];
			break;
		}
	}
	if(match) {
		inGarageCarList[inGarageCarList.length] = match;
		alert(`Car: ${carReg} has been checked into the garage`);
	}
	else {
		alert("Could not find a car with the specified registration.\nPlease add the car before checking it in.");
	}
}

function removeCarGarage() {
	let carReg = document.getElementById("carReg").value;
	let match;
	for(let i = 0; i < inGarageCarList.length; i++) {
		if(inGarageCarList[i].reg == carReg) {
			match = inGarageCarList.splice(i, 1)[0];
			break;
		}
	}
	if(match) {
		outGarageCarList[outGarageCarList.length] = match;
		alert(`Car: ${carReg} has been checked out of the garage`);
	}
	else {
		alert("Could not find a car with the specified registration.\nPlease verify the registration and try again.");
	}
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
	newDiv.innerHTML += "Cars in garage: <br>";
	for(let i = 0; i < inGarageCarList.length; i++) {
		newDiv.innerHTML += inGarageCarList[i].reg + ", ";
		newDiv.innerHTML += inGarageCarList[i].name;
		for(let j = 0; j < inGarageCarList[i].faults.length; j++) {
			newDiv.innerHTML += ", "; 
			newDiv.innerHTML += inGarageCarList[i].faults[j];
		}
		newDiv.innerHTML += "<br>";
	}
}