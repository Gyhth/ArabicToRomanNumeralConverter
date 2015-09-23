$(function() {
	//Init the class for use
    var convertNumberSystemClass = new convertNumberSystem(100, 3);
	try {
		//This is for demo purposes. 
		alert("Here");
		$("body").append(convertNumberSystemClass.calculate());
	}
	catch (e) {
		console.log(e.toString());
	}
});

var convertNumberSystem = function(){
	//Note: This is the constructor, and this function is called each time
	//The class is created. Therefore, this exists here so that
	//The commands are called. Put the variable that they populate
	//Into the prototype like is done here, to have a .prototype constructor structure.
};

var convertNumberSystem = function(value, base){
	//Note: This is the constructor, therefore this function is called each time
	//The class is created. Therefore, this exists here so that
	//The commands are called. Put the variable that they populate
	//Into the prototype like is done here, to have a .prototype constructor structure.
	this.value = value;
	this.base = base;
};

convertNumberSystem.prototype = {
	base: 10,
	value: 0,	
}

convertNumberSystem.prototype = {
	errorMessage: "",
	outputString: "",
	arrayOfConvertedContext: [],

	isNumeric: function (value, base) {
		//As of January 17th, 2015, this is how jQuery does their isNumeric
		//Therefore, it is used here as jQuery is a somewhat Standard Javascript
		//Library
		return !isNaN(parseFloat(value)) && isFinite(value)  && !isNaN(base) && isFinite(base) && (base <= 10 && base > 1);
	},
	
	calculate: function() {
		if (!this.isNumeric(this.value, this.base) && (this.value != undefined && this.base != undefined)) {
			this.error(1);
		}
		this.firstValue = true;
		this.outputString = new String();
		this.errorMessage = "";
		var tmpValue = this.value;
		while (tmpValue > 0) {
			var remainder = tmpValue % this.base;
			this.outputString = remainder + this.outputString;	
			tmpValue = Math.floor(tmpValue / this.base);
			this.firstValue = false;
		}
		return this.outputString;
	},
	
	error: function(errorValue) {
		if (errorValue === 1) {
			this.message = "Value entered is not value between base 10 and base 2 in the Arabic number system, and also an Integer value.";
			throw new this.syntaxError(errorValue, this.message);
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

