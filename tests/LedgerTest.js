(function() {
"use strict";

	describe("Ledger Test", function() {

		it("account amount starts at 0", function() {
			var ledger = new Ledger([]);
			expect(ledger.totalFor("john")).toBe(0);
		});
		
		it("should process a ledger with a single line", function() {
			var ledger = new Ledger("2015-01-16,john,mary,125.00");
			expect(ledger.totalFor("john")).toBe(-125);
			expect(ledger.totalFor("mary")).toBe(125);
		});
		
		it("should process a ledger with multiple lines", function() {
			var ledger = new Ledger([
				"2015-01-16,john,mary,125.00",
				"2015-01-16,john,mary,25.00"
			]);
			expect(ledger.totalFor("john")).toBe(-150);
			expect(ledger.totalFor("mary")).toBe(150);
		});
		
		it("should process a ledger with positive and negative transactions", function() {
			var ledger = new Ledger([
				"2015-01-16,john,mary,125.00",
				"2015-01-16,john,mary,-25.00"
			]);
			expect(ledger.totalFor("john")).toBe(-100);
			expect(ledger.totalFor("mary")).toBe(100);
		});
		
		it("should process a ledger with multipe accounts", function() {
			var ledger = new Ledger([
				"2015-01-16,john,mary,125.00",
				"2015-01-17,john,supermarket,20.00",
				"2015-01-17,mary,insurance,100.00",
				"2015-01-17,mary,bob,100.00",
				"2015-01-17,bob,john,50.00"
			]);
			expect(ledger.totalFor("john")).toBe(-95);
			expect(ledger.totalFor("mary")).toBe(-75);
			expect(ledger.totalFor("supermarket")).toBe(20);
			expect(ledger.totalFor("insurance")).toBe(100);
			expect(ledger.totalFor("bob")).toBe(50);
		});
		
		it("should process a ledger up to a given date", function() {
			var ledger = new Ledger([
				"2015-01-16,john,mary,125.00",
				"2015-01-17,john,supermarket,20.00",
				"2015-01-17,mary,insurance,100.00",
				"2015-01-17,mary,bob,100.00",
				"2015-01-17,bob,john,50.00"
			], "2015-01-16");
			expect(ledger.totalFor("john")).toBe(-125);
			expect(ledger.totalFor("mary")).toBe(125);
		});
		
		it("should process a ledger up to a given date if transactions arent in order", function() {
			var ledger = new Ledger([
				"2015-01-17,john,supermarket,20.00",
				"2015-01-17,mary,insurance,100.00",
				"2015-01-16,john,mary,125.00",
				"2015-01-17,mary,bob,100.00",
				"2015-01-17,bob,john,50.00"
			], "2015-01-16");
			expect(ledger.totalFor("john")).toBe(-125);
			expect(ledger.totalFor("mary")).toBe(125);
		});
		
	});

})();
