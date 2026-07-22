# CLAUDE.md — Project 1: GlowChain CMDB & Service Catalog

## Shared scoped app notice
This project shares ONE scoped application (`x_glowchain_core`) with Project 2 (LuxeSelf
Portal) and Project 3 (GlowChain Connect, namespaced under `x_glowchain_core.Connect.*`). This
is deliberate — realistic ServiceNow apps span CMDB/catalog, portal, and integrations together —
but it means:
- Every change here uses its own separate Update Set, never combined with a Project 2 or
  Project 3 Update Set. Prefix every Update Set name with `P1-` so all three projects' work is
  filterable within one app (e.g. `P1-Add retail POS CI class`)
- Never rename/restructure tables or CI classes without checking `docs/widget-data-contracts.md`
  in Project 2 first — Project 2's widgets read from tables this project owns
- If Project 3's integration ever writes to a table this project owns, that dependency must be
  documented in this project's `docs/cmdb-class-list.md` before the integration is marked done
- This project's README/case-study must stand alone and only reference this project's screens —
  do not let the case study wander into portal or integration territory, those belong to
  Project 2's and Project 3's own docs
- Any change here that touches a table Project 2 or Project 3 depends on requires re-running
  their regression checks before any of the three projects is marked done

## What this project is
Designing and building a CMDB schema + Service Catalog + Incident/Problem/Change workflows for
a fictional cosmetics manufacturer ("GlowChain Cosmetics") across 3 business units: Retail
Stores, Manufacturing Plants, E-commerce Platform. Full context: see /PROCESS.md and the master
charter document.

## Primary tool for this project
Claude Chrome. Almost everything here happens inside ServiceNow's admin UI (CMDB class
manager, Service Catalog designer, Flow Designer, ATF). Claude Code is only used for
BPMN-as-code diagrams and the written case study — not for touching ServiceNow directly, since
this project does not use the Source Control plugin.

## Shared scoped app notice
This project shares ONE scoped application (`x_glowchain_portfolio`) with Project 2. This is a
deliberate choice, not a default — it means Update Sets and Application Files from both
projects live in the same scope, so namespace discipline is mandatory, not optional:
- Every Update Set name is prefixed `P1-CMDB-<short description>` — never unprefixed
- Every application module/folder inside Studio is filed under a top-level "Project 1 - CMDB &
  Catalog" folder, kept visually and structurally separate from Project 2's folder
- Before closing any Update Set, confirm it contains ONLY Project 1 changes — if Studio shows a
  file touched that belongs to Project 2's area, split the Update Set before closing it
- Because CMDB/ACL changes here can affect what Project 2's portal displays, any change to a
  table Project 2 also reads from triggers a mandatory regression check: re-run the relevant
  Project 2 ACL test (see Project 2's CLAUDE.md) before marking the Project 1 task done

## Conventions
- CI class naming: `u_glowchain_<businessunit>_<citype>` (e.g. `u_glowchain_retail_pos_terminal`)
- Cap CI classes at 15 total across all 3 business units — do not let scope creep here
- Every CI class must have at least 1 relationship type defined before being considered done
- Catalog categories: exactly 3 — "IT Hardware", "Software Access", "Store/Plant Support"
- Every catalog item must route through an approval workflow, even if auto-approved — no
  catalog item should fulfill with zero workflow attached
- ITIL alignment: Incident (restore service), Problem (root cause), Change (controlled
  modification) — do not blur these three into one generic "ticket" type

## Official Documentation & SDK Reference
Refer to the official ServiceNow AI docs index at [https://raw.githubusercontent.com/ServiceNow/ServiceNowDocs/zurich/llms.txt](https://raw.githubusercontent.com/ServiceNow/ServiceNowDocs/zurich/llms.txt) and SDK documentation before generating any Fluent scripts or Business Rules.

## Verification requirement (hard rule)
Every workflow (Incident routing, Change approval chain, Catalog item fulfillment) must have a
corresponding ATF test before it's marked done. No ATF test = not done, regardless of how it
looks in a manual click-through. Store ATF test names in `docs/atf-test-log.md` with a one-line
description of what each test checks.

## What "done" looks like for this project
1. CMDB self-audit passes: every CI has correct class inheritance + ≥1 relationship
2. All 8+ catalog items are fulfillable end-to-end (request → approval → task → closure) — proven
   by an ATF test, not just eyeballed
3. BPMN diagrams exist for Incident, Problem, and Change processes (Claude Code + mermaid or
   draw.io, stored in `docs/bpmn/`)
4. Case study document explaining CI class design decisions exists in `docs/case-study.md`

## Explicitly out of scope here
Custom portal/widget UI (Project 2). External integrations (Project 3).
