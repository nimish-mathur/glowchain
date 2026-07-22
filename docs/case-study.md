# GlowChain Cosmetics — CMDB & Service Catalog Case Study

## Overview
GlowChain Cosmetics is a fictional cosmetics manufacturer spanning three business units — Retail
Stores, Manufacturing Plants, and an E-commerce Platform. This project designs and builds a CMDB
schema, a Service Catalog, and ITIL-aligned Incident/Problem/Change workflows to support all
three units on a single ServiceNow instance.

## Design goals
- Model each business unit as its own dependency chain, from the top-level business service down
  to the physical/network layer, so an outage at any layer can be traced to the service it affects.
- Keep the CMDB small and deliberate: a hard cap of 15 CI classes across all three business units,
  rather than modeling every conceivable asset. Depth of relationships mattered more than breadth
  of classes.
- Route every catalog item through an approval/fulfillment workflow — no item fulfills with zero
  workflow attached, even when approval is auto-granted.
- Keep Incident, Problem, and Change as three distinct ITIL processes rather than collapsing them
  into one generic "ticket" type.

## CMDB class design

15 CI classes were built, five per business unit, each forming a single top-to-bottom dependency
chain from business service to physical/network layer:

**Retail** — `u_glowchain_retail_store_it_service` (business service) depends on
`u_glowchain_retail_pos_application`, which runs on `u_glowchain_retail_pos_terminal`, which
connects to `u_glowchain_retail_store_network` and is used with the
`u_glowchain_retail_payment_device` peripheral.

**Manufacturing** — `u_glowchain_manufacturing_plant_operations_service` depends on
`u_glowchain_manufacturing_line_controller_application`, which runs on
`u_glowchain_manufacturing_plc_hardware`, which connects to
`u_glowchain_manufacturing_plant_network`; a `u_glowchain_manufacturing_sensor_device` feeds
telemetry the controller application consumes.

**E-commerce** — `u_glowchain_ecommerce_storefront_service` depends on
`u_glowchain_ecommerce_web_application`, which uses `u_glowchain_ecommerce_payment_gateway`
(stub/mock, no real payment integration), which runs on `u_glowchain_ecommerce_app_server`, which
connects to `u_glowchain_ecommerce_cdn_endpoint`.

Every class extends the nearest accurate OOB ServiceNow parent (`cmdb_ci_service`, `cmdb_ci_appl`,
`cmdb_ci_computer`, `cmdb_ci_netgear`, `cmdb_ci_hardware`) rather than a generic `cmdb_ci`, so
platform-native suggested relationships and reporting still apply. Two Retail classes
(`u_glowchain_retail_store_network`, `u_glowchain_retail_payment_device`) had to fall back from
their originally planned parent (`cmdb_ci_ip_switch`, `cmdb_ci_peripheral`) to the nearest
extensible ancestor, because those specific classes were not marked Extensible on this PDI — a
platform constraint discovered during the build, not a design choice. Full class-by-class detail,
including relationship direction and `sys_id`s, is tracked in `docs/cmdb-class-list.md`.

Classes and relationships were created via Update Sets prefixed `P1-Retail CMDB classes`,
`P1-Manufacturing CMDB classes`, and `P1-Ecommerce CMDB classes`, in Global scope — `u_` is the
traditional global-scope naming convention, so these classes intentionally sit outside the scoped
app rather than inside it.

## Service Catalog

Nine catalog items were built across exactly three categories — IT Hardware, Software Access, and
Store/Plant Support — three items per category, one per business unit:

| Category | Retail | Manufacturing | E-commerce |
|---|---|---|---|
| IT Hardware | New POS Terminal Request | Plant Floor Sensor or PLC Hardware Request | — |
| IT Hardware | Payment Device Replacement | — | — |
| Software Access | Retail POS Software Access Request | Manufacturing Line Controller Application Access | E-commerce Storefront Admin Access |
| Store/Plant Support | Store Network Outage Support | Plant PLC Network Maintenance | E-commerce CDN Performance Issue |

Every item is bound to a target CI from the class list above and routes through an approval
workflow — manager approval for hardware/access requests, auto-approval with a generated task for
low-risk replacements — so no item fulfills with an empty workflow.

## ITIL process design

Incident, Problem, and Change are modeled as three separate BPMN workflows (`docs/bpmn/`), each
scoped to keep the ITIL distinction explicit rather than blurring them into a single ticket type:

- **Incident** (`incident-management.md`) — service restoration. Every incident binds to a
  `u_glowchain_*` CI, routes to Tier 2 Field Support (Retail/Manufacturing) or Tier 3 DevOps
  (E-commerce) based on CI type, and escalates to Problem Management if the root cause of a
  recurring issue isn't known at closure.
- **Problem** (`problem-management.md`) — root cause analysis, Known Error KB publication, and RFC
  generation for structural fixes.
- **Change** (`change-management.md`) — Standard, Normal (CAB), and Emergency (eCAB) paths, so
  low-risk changes aren't forced through the same approval overhead as high-risk ones.

## Verification approach

Per this project's hard rule, no workflow or catalog item is considered done on the strength of a
manual click-through alone. All 9 catalog items have a corresponding ATF test
(`P1_ATF_<Category>_<Item>` naming convention), each passing at 100%, logged with execution date
and Update Set in `docs/atf-test-log.md`. CMDB relationship changes were treated as
mandatory-automated-verification per this portfolio's verification tiering — every class's
relationships were confirmed against the approved plan in CMDB Class Manager before being marked
Done in the class list, rather than trusted from memory.

## What this demonstrates
A CMDB and Service Catalog built the way a real ITSM implementation would be scoped for a mid-size
retail/manufacturing/e-commerce business: a bounded class model instead of an unbounded asset
inventory, workflows that reflect actual approval risk instead of one-size-fits-all routing, and a
test log that stands in for the kind of governance evidence a change advisory board would expect
before trusting a catalog item or CI relationship in production.
