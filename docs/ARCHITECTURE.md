# Architecture

CarFeeCalc separates the MCP interface from authoritative fee data.

```text
Cursor / MCP client
        |
        v
   MCP tools
        |
        +--> calculation layer
        |
        +--> verified state-rule dataset
        |
        +--> approved VIN/vehicle-data provider (optional)
        |
        v
 itemized estimate + provenance
```

## Design principles

- State rules are isolated so one jurisdiction cannot silently affect another.
- Government fees and dealer charges are separate categories.
- Every published rule should carry provenance and an effective/verification date.
- Missing authoritative data produces an explicit verification-required response rather than a guessed amount.
- VIN decoding is optional and provider-backed.
