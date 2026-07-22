---
name: catalog-item-with-workflow
description: Use this skill whenever creating a new Service Catalog item for the GlowChain project. Ensures every catalog item ships with a variable set, a record producer where needed, and an attached approval/fulfillment workflow — never a catalog item with no workflow.
---

# Catalog Item + Workflow Pattern

1. Determine category: must be exactly one of "IT Hardware", "Software Access",
   "Store/Plant Support" — do not create a 4th category.
2. Define variables using the variable set pattern, not one-off variables per item, so
   variables can be reused across similar items (e.g. "Store Location" variable set reused
   across all retail-facing items).
3. Every item needs a Flow Designer or classic Workflow attached — even auto-approved items
   need an explicit (if trivial) approval step, so the fulfillment path is auditable.
4. After building, write an ATF test that: submits the request, checks the approval record is
   created, approves it, and checks the fulfillment task closes correctly. Log the test name
   and what it covers in `docs/atf-test-log.md`.
5. If the item requires manager approval, use the standard GlowChain approval group naming:
   `u_glowchain_<businessunit>_managers`.
