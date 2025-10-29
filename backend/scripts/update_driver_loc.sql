SET search_path=taxi_app;
UPDATE "DriverProfile"
SET "currentLat"=-2.170,
    "currentLng"=-79.922,
    "locationUpdatedAt"=NOW(),
    status='IDLE'
WHERE "userId"=(SELECT id FROM "User" WHERE email='driver@taxi.local');

