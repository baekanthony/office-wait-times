Routes that need to be built:
- All wait times for all offices for a given day (loaded by default)
    - /?date=2026-02-02
- By a weekly range
    - input takes a date & server finds the week range?   

Components:
- Week multi-line chart (each line for a day)

Maybe consider a comparison view (office A vs B)

Things to look into:
- Seeding script for local dynamodb
- Redis cache
- Changes to scheduler
    - kinda useless to poll at 4 when it closes at 4
    - also office opens at 8:30
- Predicted wait times? (Would be cool not sure how feasible)

