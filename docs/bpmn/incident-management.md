# GlowChain Incident Management BPMN Workflow

Process flow for restoring IT services (Retail POS, Manufacturing Line Controllers, E-commerce Storefront) following ITIL v4 standards.

```mermaid
graph TD
    Start([Incident Reported]) --> Detection{Detection Source}
    Detection -->|Catalog Request / Alert| Categorize[Categorize & Priority Matrix]
    
    Categorize --> CheckCI{Link to CMDB CI}
    CheckCI -->|Retail POS / Plant PLC| RouteGroup[Route to Tier 2 IT Field Support]
    CheckCI -->|E-commerce CDN / Web App| RouteDev[Route to Tier 3 DevOps Team]
    
    RouteGroup --> Investigate[Investigate & Diagnose]
    RouteDev --> Investigate
    
    Investigate --> Resolution{Workaround Available?}
    Resolution -->|Yes| ApplyWorkaround[Apply Temporary Workaround & Restore Service]
    Resolution -->|No| Escalated[Escalate / Engage Vendor]
    
    ApplyWorkaround --> Verify[Verify Service Restoration with User]
    Escalated --> ApplyWorkaround
    
    Verify --> Resolved{User Confirms?}
    Resolved -->|Yes| CloseIncident[State: Closed Complete]
    Resolved -->|No| Investigate
    
    CloseIncident --> CheckProblem{Root Cause Known?}
    CheckProblem -->|No - Recurring Issue| CreateProblem[Trigger Problem Management Flow]
    CheckProblem -->|Yes| EndNode([End Flow])
    CreateProblem --> EndNode
```

## Key Controls & Escalation Rules
1. **CMDB Binding**: Every Incident must be linked to a target CI from `u_glowchain_*` tables (e.g. `u_glowchain_retail_pos_terminal`, `u_glowchain_manufacturing_plc_hardware`).
2. **SLA Targets**:
   - **P1 (Critical)**: Resolution within 2 hours (Plant line stoppage, Store POS outage).
   - **P2 (High)**: Resolution within 4 hours.
   - **P3/P4**: Resolution within 24–48 hours.
