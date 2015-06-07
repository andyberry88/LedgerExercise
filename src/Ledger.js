(function(window) {
	"use strict";
	
	var Ledger = function (ledgerInput, toDate) {
		this._accounts = {};
		if (typeof ledgerInput === "string") {
			ledgerInput = ledgerInput.split("\n");
		}
		var processToDate = (toDate === undefined) ? new Date() : parseDate(toDate);
		for (var i = 0; i < ledgerInput.length; i++) {
			var line = ledgerInput[i];
			if (line.length === 0) {
				continue;
			}
			var processedLine = processLine(line);
			if (processedLine.date <= processToDate) {
				var amount = processedLine.amount;
				this.getAccount(processedLine.name).removeValue(amount);
				this.getAccount(processedLine.destination).addValue(amount);
			}
		}
	};

	Ledger.prototype.getAccount = function(name) {
		var account = this._accounts[name];
		if (account === undefined) {
			account = new Account();
			this._accounts[name] = account;
		}
		return account;
	};

	Ledger.prototype.totalFor = function(name) {
		return this.getAccount(name).amount();
	};
	
	
	
	
	var Account = function() {
		this._amount = 0;
	};
	
	Account.prototype.amount = function() {
		return this._amount;
	};
	
	Account.prototype.addValue = function(val) {
		this._amount += val;
	};
	
	Account.prototype.removeValue = function(val) {
		this._amount -= val;
	};



	var processLine = function(line) {
		var lineSplit = line.split(",");
		if (lineSplit.length != 4) {
			throw new Error("Unable to parse line '"+line+"'");
		}
		return {
			"date" : parseDate(lineSplit[0]),
			"name" : lineSplit[1],
			"destination" : lineSplit[2],
			"amount" : parseAmount(lineSplit[3])
		};
	};
	var parseDate = function(dateInput) {
		var dateArray = /([0-9]{4})-([0-9]{2})-([0-9]{2})/.exec(dateInput);
		if (dateArray === null) {
			throw new Error("Unable to parse date '"+dateInput+"'");
		}
		var year = dateArray[1];
		var month = dateArray[2];
		var day = dateArray[3];
		return new Date(year, month, day);
	};
	var parseAmount = function(amount) {
		var parsedAmount = parseInt(amount);
		if (isNaN(parsedAmount)) {
			throw new Error("Unable to parse amount '"+amount+"'");
		}
		return parsedAmount;
	};


	window.Ledger = Ledger;
})(window);
