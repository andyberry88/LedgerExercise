(function(window) {
	"use strict";
	
	var Ledger = function (ledgerInput, toDate) {
		this._accounts = {};
		if (typeof ledgerInput === "string") {
			ledgerInput = ledgerInput.split("\n");
		}
		for (var i = 0; i < ledgerInput.length; i++) {
			var line = ledgerInput[i];
			if (line.length === 0) {
				continue;
			}
			var processedLine = processLine(line);
			var amount = processedLine.amount;
			var date = processedLine.date;
			this.account(processedLine.name).addTransaction(date, (amount*-1));
			this.account(processedLine.destination).addTransaction(date, amount);
		}
	};

	Ledger.prototype.account = function(name) {
		var account = this._accounts[name];
		if (account === undefined) {
			account = new Account();
			this._accounts[name] = account;
		}
		return account;
	};
	
	
	var Account = function() {
		this._transactions = [];
	};
	
	Account.prototype.balance = function() {
		return this.balanceToDate();
	};
	
	Account.prototype.balanceToDate = function(toDate) {
		var processToDate = (toDate === undefined) ? new Date() : parseDate(toDate);
		var balance = 0;
		for (var i = 0; i < this._transactions.length; i++) {
			var transaction = this._transactions[i];
			if (transaction.date > processToDate) {
				continue;
			}
			balance += transaction.amount;
		}
		return balance;
	};
	
	Account.prototype.addTransaction = function(date, amount) {
		this._transactions.push({
			"date":date,
			"amount": amount
		});
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
