# GlowChain Problem Management BPMN Workflow

Process flow for identifying and eliminating root causes of recurring incidents across GlowChain infrastructure.

```mermaid
graph TD
    Start([Problem Record Created]) --> Source{Origin}
    Source -->|Recurring Incidents| Assess[Assess Problem Scope & Impact]
    Source -->|Major Outage RCA| Assess
    
    Assess --> LinkCIs[Link Affected CMDB CIs & Incidents]
    LinkCIs --> RCA[Perform Root Cause Analysis - RCA]
    
    RCA --> KnownError{Root Cause Identified?}
    KnownError -->|Workaround Found| CreateKE[Publish Known Error Article to KB]
    KnownError -->|Permanent Fix Needed| CreateRFC[Generate Change Request - RFC]
    
    CreateKE --> CreateRFC
    CreateRFC --> ImplementChange[Track Change Execution via Change Management]
    
    ImplementChange --> Review[Post-Implementation Review - PIR]
    Review --> ResolveProblem[Mark Problem State: Resolved / Closed]
    ResolveProblem --> EndNode([End Flow])
```

## Key Controls
1. **Known Error Database**: Workarounds published directly to ServiceNow Knowledge Base.
2. **Change Integration**: Structural changes to CIs (e.g. firmware update on PLC controllers, network router replacements) require an RFC tied to the Problem record.
