---
name: cmdb-ci-class-design
description: Use this skill any time a new CMDB CI class is being defined, extended, or related to another class for the GlowChain Cosmetics CMDB project. Covers naming, inheritance, and relationship rules specific to this project.
---

# CMDB CI Class Design Pattern

When defining a new CI class for GlowChain Cosmetics:

1. **Naming**: `u_glowchain_<businessunit>_<citype>`, all lowercase, underscore-separated.
   Business unit must be one of: `retail`, `manufacturing`, `ecommerce`.

2. **Inheritance**: Extend the closest matching out-of-box ServiceNow CMDB class
   (`cmdb_ci_hardware`, `cmdb_ci_appl`, `cmdb_ci_service`, etc.) rather than building from
   `cmdb_ci` directly, unless no reasonable base class exists — justify in the class's
   description field if you do build from the base class.

3. **Relationships**: Every new CI class needs at least one relationship type defined before
   it's considered complete. Ask: "what does this depend on, and what depends on it?" Common
   GlowChain patterns:
   - Retail POS terminal → "Runs on" → Store network CI
   - Manufacturing line CI → "Depends on" → Plant facility CI
   - E-commerce service CI → "Uses" → Payment gateway CI (stub/mock — no real integration here)

4. **Do not** create a new CI class if an existing GlowChain class covers the same concept with
   a different name — check the CMDB class hierarchy list in `docs/cmdb-class-list.md` first and
   update that list whenever a new class is added.

5. **Output when this skill runs**: update `docs/cmdb-class-list.md` with the new class, its
   parent, and its relationships — this file is the single source of truth for the CMDB self-audit.
