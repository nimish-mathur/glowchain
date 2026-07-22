# GlowChain CMDB & Service Catalog — ServiceNow ITSM Case Study

A ServiceNow scoped application built for a fictional cosmetics manufacturer, **GlowChain
Cosmetics**, spanning three business units — Retail Stores, Manufacturing Plants, and an
E-commerce Platform. This project designs and implements a CMDB schema, a Service Catalog, and
ITIL-aligned Incident/Problem/Change workflows, plus a custom Incident Response Manager UI page
built with the ServiceNow SDK (Fluent + React).

## What's in this repo

- **CMDB class design** — 15 CI classes (5 per business unit), each forming a single top-to-bottom
  dependency chain from business service down to the physical/network layer. See
  [`docs/cmdb-class-list.md`](./docs/cmdb-class-list.md) for the full class-by-class breakdown with
  relationships and `sys_id`s.
- **Service Catalog** — 9 catalog items across 3 categories (IT Hardware, Software Access,
  Store/Plant Support), each bound to a target CI and routed through an approval/fulfillment
  workflow.
- **ITIL process design** — Incident, Problem, and Change modeled as three distinct workflows,
  documented as BPMN diagrams in [`docs/bpmn/`](./docs/bpmn/).
- **Verification** — every catalog item and workflow is backed by an Automated Test Framework
  (ATF) test, logged in [`docs/atf-test-log.md`](./docs/atf-test-log.md); no item is considered
  done on the strength of a manual click-through alone.
- **Incident Response Manager** — a custom UI Page (`src/fluent/ui-pages/incident-manager.now.ts`)
  with a React front end (`src/client/`) for listing, creating, and updating incidents against the
  ServiceNow Table API.

Full write-up of design goals and decisions: [`docs/case-study.md`](./docs/case-study.md).

## Governance

Every change ships in an Update Set prefixed `P1-` and is tracked against the class list and ATF
log above before being marked done — see [`project1-glowchain-cmdb/CLAUDE.md`](./project1-glowchain-cmdb/CLAUDE.md)
for the full verification rules this project was built against.

## Tech

ServiceNow SDK (Fluent scripting), React 19 + TypeScript for the custom UI page, CMDB Class
Manager, Service Catalog, Flow Designer, and Automated Test Framework — all within a single
scoped ServiceNow application on a Personal Developer Instance (PDI).

## Author

Nimish Mathur
