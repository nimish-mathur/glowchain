# GlowChain CMDB Class List

Single source of truth for CI class design, per `cmdb-ci-class-design` skill rule 4/5. Update this
file whenever a class is added; mark a row Done with its actual `sys_id` only after it exists in
ServiceNow (CMDB self-audit depends on this being accurate, not aspirational).

Class cap: 15 total across all 3 business units (Retail, Manufacturing, E-commerce).

## Retail

Approved plan — Update Set `P1-Retail CMDB classes`.

| CI Class | Parent OOB Class | Relationship | Related CI Class | Rationale | Status | sys_id |
|---|---|---|---|---|---|---|
| `u_glowchain_retail_store_it_service` | `cmdb_ci_service` | Depends on | `u_glowchain_retail_pos_application` | Top-level "Store IT" business service depends on the POS application stack functioning | Done | `c3be51f0930ecf10382c1aebb9373c80` |
| `u_glowchain_retail_pos_application` | `cmdb_ci_appl` | Runs on | `u_glowchain_retail_pos_terminal` | POS software requires the physical terminal to run | Done | `247f1d34930ecf10382c1aebb9373c07` |
| `u_glowchain_retail_pos_terminal` | `cmdb_ci_computer` | Connects to | `u_glowchain_retail_store_network` | Register hardware needs in-store network connectivity to process transactions | Done | `4f2065f4930ecf10382c1aebb9373c73` |
| `u_glowchain_retail_store_network` | `cmdb_ci_netgear`\* | Provides network to | `u_glowchain_retail_pos_terminal` | In-store switch/router serves all POS terminals at a location | Done | `44f06138930ecf10382c1aebb9373c76` |
| `u_glowchain_retail_payment_device` | `cmdb_ci_hardware`\* | Used by | `u_glowchain_retail_pos_terminal` | Card reader is a peripheral attached to and used by the POS terminal | Done | `a9f1a9f8930ecf10382c1aebb9373c3a` |

\* Parent class deviates from the originally approved plan: `cmdb_ci_ip_switch` and `cmdb_ci_peripheral` are not marked Extensible on this instance (no "Add Child Class" option in CMDB Class Manager). Substituted their nearest extensible ancestor — `cmdb_ci_netgear` (Network Gear) and `cmdb_ci_hardware` (Hardware) respectively — both still accurate parent concepts.

Update Set: `P1-Retail CMDB classes` (Global scope — `u_` naming convention is the traditional global-scope pattern, so classes were created with Application scope set to Global rather than the `x_1814931_glow` scoped app).

Suggested relationships were added in CMDB Class Manager for all 5 classes (bidirectional pairs: Depends on/Used by, Runs on/Runs, Connects to/Connected by, Used by/Uses), matching the table above.

## Manufacturing

Approved plan — Update Set `P1-Manufacturing CMDB classes`.

| CI Class | Parent OOB Class | Relationship | Related CI Class | Rationale | Status | sys_id |
|---|---|---|---|---|---|---|
| `u_glowchain_manufacturing_plant_operations_service` | `cmdb_ci_service` | Depends on | `u_glowchain_manufacturing_line_controller_application` | Top-level "Plant Operations" business service depends on the line control software functioning | Done | `6c39d9c4935a0b90382c1aebb9373c02` |
| `u_glowchain_manufacturing_line_controller_application` | `cmdb_ci_appl` | Runs on | `u_glowchain_manufacturing_plc_hardware` | Line control software requires the PLC hardware to execute | Done | `98e91d48935a0b90382c1aebb9373c1c` |
| `u_glowchain_manufacturing_plc_hardware` | `cmdb_ci_computer` | Connects to | `u_glowchain_manufacturing_plant_network` | PLC/industrial controller needs plant network connectivity to report status and receive commands | Done | `a65a9988935a0b90382c1aebb9373cab` |
| `u_glowchain_manufacturing_plant_network` | `cmdb_ci_netgear` | Provides network to | `u_glowchain_manufacturing_plc_hardware` | Plant-floor switch/router serves all PLCs and sensors on the line | Done | `a6ea5dc8935a0b90382c1aebb9373c63` |
| `u_glowchain_manufacturing_sensor_device` | `cmdb_ci_hardware` | Used by | `u_glowchain_manufacturing_line_controller_application` | Line sensor (temperature/fill-level/etc.) feeds telemetry the controller application consumes | Done | `cc6b154c935a0b90382c1aebb9373cc9` |

Update Set: `P1-Manufacturing CMDB classes` (Global scope, same convention as Retail). All 5 base OOB parent classes (`cmdb_ci_service`, `cmdb_ci_appl`, `cmdb_ci_computer`, `cmdb_ci_netgear`, `cmdb_ci_hardware`) were Extensible on this instance — no fallback substitution needed this time.

Suggested relationships added in CMDB Class Manager: Plant Operations Service inherits "Depends on" from Service defaults; Line Controller Application inherits "Depends on Service" from Application defaults; PLC Hardware → Connects to → Plant Network (and reciprocal Connected by, auto-derived); Sensor Device → Used by → Line Controller Application (explicit, added manually since Hardware has no OOB suggested relationships).

## E-commerce

Approved plan — Update Set `P1-Ecommerce CMDB classes`.

| CI Class | Parent OOB Class | Relationship | Related CI Class | Rationale | Status | sys_id |
|---|---|---|---|---|---|---|
| `u_glowchain_ecommerce_storefront_service` | `cmdb_ci_service` | Depends on | `u_glowchain_ecommerce_web_application` | Top-level "Storefront" business service depends on the web application functioning | Done | `d68f9984939a0b90382c1aebb9373cbb` |
| `u_glowchain_ecommerce_web_application` | `cmdb_ci_appl` | Uses | `u_glowchain_ecommerce_payment_gateway` | Storefront app uses the payment gateway (stub/mock, no real integration) per skill's E-commerce pattern | Done | `0aff59c4939a0b90382c1aebb9373c0e` |
| `u_glowchain_ecommerce_payment_gateway` | `cmdb_ci_appl` | Runs on | `u_glowchain_ecommerce_app_server` | Payment gateway service requires application server compute | Done | `ca70a548939a0b90382c1aebb9373c16` |
| `u_glowchain_ecommerce_app_server` | `cmdb_ci_computer` | Connects to | `u_glowchain_ecommerce_cdn_endpoint` | App server routes static asset delivery through the CDN | Done | `d4f021c8939a0b90382c1aebb9373c8e` |
| `u_glowchain_ecommerce_cdn_endpoint` | `cmdb_ci_service` | Connected by (reciprocal of App Server's Connects to) | `u_glowchain_ecommerce_app_server` | CDN edge endpoint serves cached storefront assets, reached via the app server | Done | `7e61250c939a0b90382c1aebb9373cef` |

Class cap reached: 15/15 across all 3 business units. Update Set: `P1-Ecommerce CMDB classes` (Global scope). All parent OOB classes were Extensible — no fallback substitutions needed. Suggested relationships: Storefront Service inherits Depends-on defaults; Web Application → Uses → Payment Gateway (explicit); Payment Gateway → Runs on → App Server (derived from Application defaults); App Server → Connects to → CDN Endpoint (explicit, with auto-derived reciprocal Connected by on CDN Endpoint).
