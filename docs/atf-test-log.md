# GlowChain Project 1 — ATF Test Log

Single source of truth for Project 1 Automated Test Framework (ATF) test results per `CLAUDE.md` and `PROCESS.md`. No catalog item or workflow is marked done without its corresponding ATF test passing.

## Test Results Summary

| # | Test Name | Category | Catalog Item Name | Execution Date | Result | Pass Rate | Update Set | Logged By |
|---|---|---|---|---|---|---|---|---|
| 1 | `P1_ATF_ITHardware_POSTerminal` | IT Hardware | New POS Terminal Request | 2026-07-21 | PASS | 100% | `P1-IT Hardware catalog items` | Claude / Admin |
| 2 | `P1_ATF_ITHardware_PLCSensor` | IT Hardware | Plant Floor Sensor or PLC Hardware Request | 2026-07-21 | PASS | 100% | `P1-IT Hardware catalog items` | Claude / Admin |
| 3 | `P1_ATF_ITHardware_PaymentDevice` | IT Hardware | Payment Device Replacement | 2026-07-21 | PASS | 100% | `P1-IT Hardware catalog items` | Claude / Admin |
| 4 | `P1_ATF_SoftAccess_RetailPOS` | Software Access | Retail POS Software Access Request | 2026-07-21 | PASS | 100% | `P1-Software Access catalog items` | Claude / Admin |
| 5 | `P1_ATF_SoftAccess_LineController` | Software Access | Manufacturing Line Controller Application Access | 2026-07-21 | PASS | 100% | `P1-Software Access catalog items` | Claude / Admin |
| 6 | `P1_ATF_SoftAccess_StorefrontAdmin` | Software Access | E-commerce Storefront Admin Access | 2026-07-21 | PASS | 100% | `P1-Software Access catalog items` | Claude / Admin |
| 7 | `P1_ATF_Support_StoreNetwork` | Store/Plant Support | Store Network Outage Support | 2026-07-21 | PASS | 100% | `P1-Store/Plant Support catalog items` | Claude / Admin |
| 8 | `P1_ATF_Support_PlantPLC` | Store/Plant Support | Plant PLC Network Maintenance | 2026-07-21 | PASS | 100% | `P1-Store/Plant Support catalog items` | Claude / Admin |
| 9 | `P1_ATF_Support_EcomCDN` | Store/Plant Support | E-commerce CDN Performance Issue | 2026-07-21 | PASS | 100% | `P1-Store/Plant Support catalog items` | Claude / Admin |

---

## Detailed Test & Item Definitions

### Category 1: IT Hardware (Update Set: `P1-IT Hardware catalog items`)
1. **`P1_ATF_ITHardware_POSTerminal`**: Tests `New POS Terminal Request` (Target CI: `u_glowchain_retail_pos_terminal`). Asserts Request, RITM, and SCTASK creation.
2. **`P1_ATF_ITHardware_PLCSensor`**: Tests `Plant Floor Sensor or PLC Hardware Request` (Target CI: `u_glowchain_manufacturing_plc_hardware`). Asserts Manager approval routing.
3. **`P1_ATF_ITHardware_PaymentDevice`**: Tests `Payment Device Replacement` (Target CI: `u_glowchain_retail_payment_device`). Asserts auto-approval & task generation.

### Category 2: Software Access (Update Set: `P1-Software Access catalog items`)
4. **`P1_ATF_SoftAccess_RetailPOS`**: Tests `Retail POS Software Access Request`. Verifies store cashier/manager role variable selection and approval.
5. **`P1_ATF_SoftAccess_LineController`**: Tests `Manufacturing Line Controller Application Access`. Verifies plant line operator permissions.
6. **`P1_ATF_SoftAccess_StorefrontAdmin`**: Tests `E-commerce Storefront Admin Access`. Verifies admin security task routing.

### Category 3: Store/Plant Support (Update Set: `P1-Store/Plant Support catalog items`)
7. **`P1_ATF_Support_StoreNetwork`**: Tests `Store Network Outage Support` (Target CI: `u_glowchain_retail_store_network`). Priority routing for in-store switch/router outages.
8. **`P1_ATF_Support_PlantPLC`**: Tests `Plant PLC Network Maintenance` (Target CI: `u_glowchain_manufacturing_plant_network`). Maintenance window scheduling.
9. **`P1_ATF_Support_EcomCDN`**: Tests `E-commerce CDN Performance Issue` (Target CI: `u_glowchain_ecommerce_cdn_endpoint`). Asset latency support routing.
