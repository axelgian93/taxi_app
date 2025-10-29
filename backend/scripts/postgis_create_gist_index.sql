-- Enable PostGIS extension (safe if already enabled)
CREATE EXTENSION IF NOT EXISTS postgis;

-- Functional GiST index to speed up ST_DWithin/ST_Distance on current location
-- Uses geography casts for accurate meters
CREATE INDEX IF NOT EXISTS idx_driverprofile_geog
  ON "DriverProfile"
  USING GIST (
    (
      public.ST_SetSRID(
        public.ST_MakePoint("currentLng","currentLat"), 4326
      )::public.geography
    )
  );

