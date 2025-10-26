-- Enable PostGIS and add a functional GiST index for nearest-driver matching
-- Try to enable PostGIS if available; ignore errors if not permitted
DO $$
BEGIN
  BEGIN
    EXECUTE 'CREATE EXTENSION IF NOT EXISTS postgis';
  EXCEPTION WHEN OTHERS THEN
    -- Lack of permission or extension not installed; proceed without failing
    NULL;
  END;
END$$;

-- Create a functional index over currentLng/currentLat as a geography point
DO $$
BEGIN
  -- Only create the GiST index if PostGIS is installed and geography type exists
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'postgis') THEN
    IF NOT EXISTS (
      SELECT 1 FROM pg_indexes WHERE schemaname = current_schema() AND indexname = 'idx_driverprofile_location_gix'
    ) THEN
      BEGIN
        -- Attempt to create the GiST index using geography; if type resolution fails, ignore
        EXECUTE 'CREATE INDEX idx_driverprofile_location_gix ON "DriverProfile" USING GIST ((ST_SetSRID(ST_MakePoint("currentLng","currentLat"), 4326)::geography))';
      EXCEPTION WHEN undefined_object THEN
        -- geography type not resolvable in search_path; skip silently
        NULL;
      WHEN others THEN
        -- Any other PostGIS-related issue, skip index creation to avoid blocking migrations in dev
        NULL;
      END;
    END IF;
  END IF;
END$$;
