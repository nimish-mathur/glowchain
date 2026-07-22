# GlowChain Change Management BPMN Workflow

Process flow for managing low-risk Standard, Normal, and Emergency changes to GlowChain CMDB infrastructure.

```mermaid
graph TD
    Start([Change Request Initiated]) --> Classify{Change Type}
    
    Classify -->|Pre-Approved Routine| Standard[Standard Change]
    Classify -->|Infrastructure Update| Normal[Normal Change]
    Classify -->|Critical Outage Fix| Emergency[Emergency Change]
    
    Standard --> PeerReview[Pre-Approved Template Execution]
    
    Normal --> RiskAssessment[Perform Risk & Impact Analysis]
    RiskAssessment --> CABReview[Submit to Change Advisory Board - CAB]
    CABReview --> Approved{CAB Approved?}
    Approved -->|No| Rework[Return for Rework / Reject]
    Approved -->|Yes| Schedule[Schedule Maintenance Window]
    
    Emergency --> ECAB[Emergency CAB Approval]
    ECAB --> Schedule
    
    Schedule --> Implement[Implement Change & Deploy]
    PeerReview --> Implement
    
    Implement --> PostTest{Post-Implementation Test}
    PostTest -->|Success| CloseChange[Mark Change: Closed Successful]
    PostTest -->|Failure| Rollback[Execute Rollback Plan]
    
    Rollback --> CloseFailed[Mark Change: Closed Unsuccessful]
    CloseChange --> EndNode([End Flow])
    CloseFailed --> EndNode
```

## Change Types & Governance
* **Standard Change**: Pre-approved routine maintenance (e.g. standard POS terminal software updates).
* **Normal Change**: Requires CAB approval and risk analysis (e.g. updating PLC line controller firmware, network switch replacements).
* **Emergency Change**: Urgent fixes requiring eCAB rapid approval (e.g. active CDN outage or store network failover).
