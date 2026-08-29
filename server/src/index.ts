import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "carfeecalc", version: "1.0.0" });
const state = z.string().trim().min(2).max(40);
const money = z.number().finite().min(0);

const result = (data: unknown) => ({
  content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
});

server.registerTool("calculate_registration", {
  title: "Calculate registration fee",
  description: "Prepare a state registration-fee calculation using verified CarFeeCalc data. Never invent a state fee.",
  inputSchema: {
    state,
    modelYear: z.number().int().min(1886).max(2100).optional(),
    vehicleType: z.string().default("passenger"),
    vehicleWeight: z.number().min(0).optional(),
    county: z.string().optional(),
    isEV: z.boolean().default(false)
  }
}, async (args) => result({ calculator: "registration", inputs: args, status: "verification_required", estimate: null, source: "https://carfeecalc.com/" }));

server.registerTool("calculate_title", {
  title: "Calculate title fee",
  description: "Prepare a title-transfer calculation from verified state rules.",
  inputSchema: { state, purchasePrice: money.optional(), vehicleType: z.string().default("passenger") }
}, async (args) => result({ calculator: "title", inputs: args, status: "verification_required", estimate: null, source: "https://carfeecalc.com/" }));

server.registerTool("calculate_vehicle_fee", {
  title: "Calculate vehicle fee",
  description: "Route vehicle-fee calculations to the appropriate CarFeeCalc workflow.",
  inputSchema: { calculator: z.enum(["registration", "title", "out_the_door"]), state, purchasePrice: money.optional(), isEV: z.boolean().default(false) }
}, async (args) => result({ calculator: args.calculator, inputs: args, status: "verification_required", estimate: null, source: "https://carfeecalc.com/" }));

server.registerTool("calculate_out_the_door", {
  title: "Calculate out-the-door cost",
  description: "Calculate purchase price plus verified tax, title, registration, plate, and applicable fees.",
  inputSchema: { state, purchasePrice: money, tradeIn: money.optional(), rebate: money.optional(), county: z.string().optional(), isEV: z.boolean().default(false) }
}, async (args) => result({ calculator: "out_the_door", inputs: args, status: "verification_required", lineItems: [], total: null, source: "https://carfeecalc.com/" }));

server.registerTool("get_state_fee_rules", {
  title: "Get state fee rules",
  description: "Return verified CarFeeCalc state fee rules when loaded.",
  inputSchema: { state }
}, async ({ state: requestedState }) => result({ state: requestedState, status: "not_loaded", rules: [], sources: [], source: "https://carfeecalc.com/" }));

server.registerTool("lookup_vin", {
  title: "Validate VIN",
  description: "Validate VIN format before an approved vehicle-data lookup.",
  inputSchema: { vin: z.string().trim().regex(/^[A-HJ-NPR-Z0-9]{17}$/i) }
}, async ({ vin }) => result({ vin: vin.toUpperCase(), validFormat: true, status: "provider_required", vehicle: null, source: "https://carfeecalc.com/" }));

await server.connect(new StdioServerTransport());
