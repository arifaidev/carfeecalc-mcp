# Vehicle Data and VIN

Handle VIN workflows safely for CarFeeCalc.

Validate the 17-character VIN format and reject invalid characters such as I, O, and Q. Do not claim decoded make, model, trim, MSRP, weight, or tax classification without a configured authoritative or approved vehicle-data provider.

Keep VIN decoding separate from state fee calculation so vehicle facts can be updated independently.
