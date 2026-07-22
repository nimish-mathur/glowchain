---
name: atf-test-writer
description: Use this skill whenever a workflow, catalog item, or CI relationship needs an Automated Test Framework (ATF) test written before a task can be marked done in this project. This is the verification backbone for Project 1 — no ATF test means the task is not complete.
---

# ATF Test Writer

Every functional change in this project needs an ATF test proving it works, not just a manual
click-through. Pattern:

1. **Name the test** `atf_<area>_<what it checks>` (e.g. `atf_incident_auto_assignment`,
   `atf_catalog_pos_terminal_request`).
2. **Structure**: Impersonate a test user relevant to the scenario → perform the action (submit
   record, run a UI action) → assert the expected end state (record field values, related list
   contents, state transitions).
3. **Coverage minimum for this project**: one ATF test per catalog item's full request→fulfillment
   path, one per Incident/Problem/Change workflow's state transitions, one confirming CMDB
   relationship integrity after any CI class change.
4. **Log every test** in `docs/atf-test-log.md` with: test name, what it checks, last run
   status. This file is what an independent reviewer checks against — if a test isn't logged
   here, treat the underlying work as unverified regardless of what the agent claims.
5. **Do not** let the same agent session that built the feature also be the only one that
   "confirms" the ATF test passed — re-run it in a fresh session or have the human governance
   step in PROCESS.md re-run it before sign-off.
