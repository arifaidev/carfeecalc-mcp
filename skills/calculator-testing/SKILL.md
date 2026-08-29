# Calculator Testing

Test CarFeeCalc calculators before publishing changes.

Cover zero values, boundaries, missing inputs, EV versus non-EV vehicles, county/local tax differences, trade-ins, rebates, rounding, and impossible combinations.

Test invariants such as: itemized components sum to the displayed total; percentages are applied to the correct taxable base; excluded fees do not enter tax calculations; and changing one input does not silently alter unrelated fees.
