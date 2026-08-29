# CarFeeCalc MCP & Cursor Plugin

Official MCP server and Cursor Directory plugin for [CarFeeCalc.com](https://carfeecalc.com/).

CarFeeCalc helps users and AI agents work with vehicle registration fees, title fees, sales tax, plate fees, EV fees, VIN workflows, and out-the-door purchase estimates.

## Features

- Vehicle registration fee workflows
- Title transfer fee workflows
- State-specific fee research
- Sales-tax and local-tax workflow support
- EV-specific fee handling
- VIN format validation and vehicle-data integration boundaries
- Out-the-door cost calculation
- Fee-source verification and effective-date checks
- Calculator regression and edge-case testing
- SEO workflows for state vehicle-fee pages

## MCP tools

The MCP server exposes:

- `calculate_registration`
- `calculate_title`
- `calculate_vehicle_fee`
- `calculate_out_the_door`
- `get_state_fee_rules`
- `lookup_vin`

The server is deliberately conservative. It does not fabricate government fees or vehicle attributes when authoritative data is not loaded.

## Run

```bash
npm install
npm start
```

For Cursor/MCP clients, the included `.mcp.json` points to this GitHub repository.

## Cursor Directory

Repository: https://github.com/arifaidev/carfeecalc-mcp

Homepage: https://carfeecalc.com/

## Accuracy policy

State DMV, BMV, DOT, revenue, title, registration, sales-tax, plate, and EV-fee values must be verified against authoritative sources. Record effective dates where available. Never present an invented fee as an official amount.

## Disclaimer

CarFeeCalc estimates are informational and are not affiliated with any DMV, state agency, tax authority, dealer, or manufacturer. Final charges can vary by jurisdiction, transaction details, dealer fees, and government changes.

## License

MIT
