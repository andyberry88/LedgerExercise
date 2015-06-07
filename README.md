# Programming Exercise

A programming exercise to write a small ledger processing script.

## Specification

We're going to be keeping track of financial transactions between different
parties -- people and organisations. In our system, these parties are identified
by a simple string such as "john" or "supermarket", and you will be provided
with a ledger of transactions that looks like this:

    2015-01-16,john,mary,125.00
    2015-01-17,john,supermarket,20.00
    2015-01-17,mary,insurance,100.00

In this example, John pays Mary Â§125.00 (Â§ is our fictional currency) on the
16th of January, and the next day he pays the supermarket Â§20.00, and Mary
pays her insurance company, which costs her Â§100.00.

Your task will be to write a software system that can process a ledger in this
format, and provide access to the accounts of each of the named parties,
assuming they all started with a balance of zero. For example, the supermarket
has received Â§20.00, so that's its balance. John has paid out Â§125.00 to Mary
and Â§20.00 to the supermarket, so his balance is in debit by Â§145.00. In other
words, his balance is Â§-145.00.

Of course, there's a twist, which is as follows. We'd like to be able to find
out what each party's balance is at a specified date. For example, Mary's
balance on the 16th of January is Â§0.00, but on the 17th it's Â§125.00.
