-- Enable PostGIS extension (no-op if already enabled)
DO $$
BEGIN
  -- Try to enable PostGIS; ignore failures (e.g., shadow DB without privileges)
  BEGIN
    EXECUTE 'CREATE EXTENSION IF NOT EXISTS postgis';
  EXCEPTION WHEN OTHERS THEN
    -- ignore
    NULL;
  END;
END$$;

-- Create functional GiST index to speed up ST_DWithin/ST_Distance on DriverProfile current location
-- Optional index creation removed to ensure shadow DB compatibility
