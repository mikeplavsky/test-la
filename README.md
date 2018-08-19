### Quering Azure Log Analytics

Based on https://dev.loganalytics.io/ 

Steps:
- create application with `az ad sp create-for-rbac`
- assign role `Log Analytics Reader` to application for queried workspace
