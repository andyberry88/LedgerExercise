(function(window) {
	"use strict";
	
	var Ledger = function (ledgerInput) {
		this._accounts = {};
		var processedLine = processLine(ledgerInput);
		var amount = processedLine.amount;
		this.getAccount(processedLine.name).removeValue(amount);
		this.getAccount(processedLine.destination).addValue(amount);
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
		return {
			"date" : lineSplit[0],
			"name" : lineSplit[1],
			"destination" : lineSplit[2],
			"amount" : parseInt(lineSplit[3])
		};
	};


	window.Ledger = Ledger;
})(window);
