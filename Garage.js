"use strict";

class Car {
	constructor(reg, name, faults) {
		this.reg = reg;
		this.name = name;
		this.faults = faults;
	}
}

//var inGarageCarList = [{"reg":"k10 21k","name":"Peugeot","faults":["Broken Headlight"]}, {"reg":"k10 21k","name":"Peugeot","faults":["Broken Headlight", "Cracked Window"]}, {"reg":"k10 21k","name":"Peugeot","faults":["Broken Headlight"]}];
var inGarageCarList = [];
var outGarageCarList = [];



function calcCarCost() {
	var carReg = document.getElementById("carReg").value;
	var match;
	for(let i = 0; i < inGarageCarList.length; i++) {
		if(inGarageCarList[i].reg == carReg) {
			match = inGarageCarList[i];
			break;
		}
	}
	if(match) {
		var baseCost = 100;
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
		
		var newDiv = document.getElementById("garageCarCost");
		if(newDiv) {
			newDiv.innerHTML = "";
		}
		else {
			var garageDiv = document.getElementById("garageControl");
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
	var registration = document.getElementById("carReg").value;
	var name = document.getElementById("carName").value;
	var faultsList = document.getElementById("carFaults").value.split(",");
	outGarageCarList[outGarageCarList.length] = {"reg":registration, "name":name, "faults":faultsList};
	alert(`Created car: Reg: ${registration}, Name: ${name}, Faults: ${faultsList}`);
}

function addCarGarage() {
	var carReg = document.getElementById("garageInputReg").value;
	var match;
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
	var carReg = document.getElementById("carReg").value;
	var match;
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
	var newDiv = document.getElementById("garageContent");
	if(newDiv) {
		newDiv.innerHTML = "";
	}
	else {
		var garageDiv = document.getElementById("garageControl");
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