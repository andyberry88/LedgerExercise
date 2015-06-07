(function() {
"use strict";

	describe("Ledger Test", function() {
		it("should process a ledger with a single line", function() {
			var ledger = new Ledger("2015-01-16,john,mary,125.00");
			expect(ledger.totalFor("john")).toBe(-125);
			expect(ledger.totalFor("mary")).toBe(125);
		});
	});

})();
