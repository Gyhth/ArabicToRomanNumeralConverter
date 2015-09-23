$(function() {
	//Init the class for use
    var arabicToRomanNumeral = new arabicToRomanNumeralClass();
	try {
		//This is for demo purposes. 
		$("body").append(arabicToRomanNumeral.calculate(5));
		$("body").append("<br />");
		$("body").append(arabicToRomanNumeral.calculate(500));
		$("body").append("<br />");
		$("body").append(arabicToRomanNumeral.calculate(5000));
		$("body").append("<br />");
		$("body").append(arabicToRomanNumeral.calculate(350));
		$("body").append("<br />");
		$("body").append(arabicToRomanNumeral.calculate(1500));
		$("body").append("<br />");
		$("body").append(arabicToRomanNumeral.calculate(2014));
		$("body").append("<br />");
	}
	catch (e) {
		console.log(e.toString());
	}
});

var arabicToRomanNumeralClass = function(){
	//Note: This is the constructor, therefore this function is called each time
	//The class is created. Therefore, this exists here so that
	//The commands are called. Put the variable that they populate
	//Into the prototype like is done here, to have a .prototype constructor structure.
	
	//After researching it, and trying to think of one, 
	//It seems there is no really good way to 
	//Check if the value is 4, 9, 400, 900, etc through a basic, and fast
	//Looping operation. Therefore, this method is used instead.
	this.arrayOfRomanNumerals.push(new romanNumeralClass("M",1000));
	this.arrayOfRomanNumerals.push(new romanNumeralClass("CM",900));
	this.arrayOfRomanNumerals.push(new romanNumeralClass("D",500));
	this.arrayOfRomanNumerals.push(new romanNumeralClass("CD",400));
	this.arrayOfRomanNumerals.push(new romanNumeralClass("C",100));
	this.arrayOfRomanNumerals.push(new romanNumeralClass("XC",90));
	this.arrayOfRomanNumerals.push(new romanNumeralClass("L",50));
	this.arrayOfRomanNumerals.push(new romanNumeralClass("XL",40));
	this.arrayOfRomanNumerals.push(new romanNumeralClass("X",10));
	this.arrayOfRomanNumerals.push(new romanNumeralClass("IX",9));
	this.arrayOfRomanNumerals.push(new romanNumeralClass("V",5));
	this.arrayOfRomanNumerals.push(new romanNumeralClass("IV",4));
	this.arrayOfRomanNumerals.push(new romanNumeralClass("I",1));
	

};
var romanNumeralClass = function(symbol, value){
	//Note: This is the constructor, therefore this function is called each time
	//The class is created. Therefore, this exists here so that
	//The commands are called. Put the variable that they populate
	//Into the prototype like is done here, to have a .prototype constructor structure.
	this.symbol = symbol;
	this.value = value;
};

romanNumeralClass.prototype = {
	symbol: "",
	value: 0,	
}

arabicToRomanNumeralClass.prototype = {
	errorMessage: "",
	outputString: "",
	arrayOfRomanNumerals: [],

	isNumeric: function (number) {
		//As of January 17th, 2015, this is how jQuery does their isNumeric
		//Therefore, it is used here as jQuery is a somewhat Standard Javascript
		//Library
		return !isNaN(parseFloat(number)) && isFinite(number);
	},
	
	calculate: function(value) {
		this.outputString = "";
		this.errorMessage = "";
		if (!this.isNumeric(value)) {
			this.error(1)
		}
		else {
			var tmpValue = value;
			var instances = 0;
			while (tmpValue > 0) {
				for (var i = 0; i < this.arrayOfRomanNumerals.length; i++) {
					instances = Math.floor(tmpValue/this.arrayOfRomanNumerals[i].value);
					for (var count = 0; count < instances; count++) {
						this.outputString += this.arrayOfRomanNumerals[i].symbol;
						//Each time we add a Roman Numeral to the string,
						//May as well remove its value from our temp.
						//Easiest way I could think of of doing this.
						tmpValue -= this.arrayOfRomanNumerals[i].value;
					}
				}
			}
			return this.outputString;
		}
    },
	
	error: function(errorValue) {
		if (errorValue === 1) {
			this.message = "Value entered is not a base 10, Arabic(Decimal) value.";
			throw new this.syntaxError(value, message);
			
		}	
	},
	
	syntaxError: function(value, message) {
		this.value = value;
		this.message = message;
		this.toString = function () {
			return this.value + " " + this.message;
		}
	}
};

