SET search_path TO taxi_app, public;
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE INDEX IF NOT EXISTS idx_driverprofile_location_gix ON taxi_app."DriverProfile" USING GIST ((public.ST_SetSRID(public.ST_MakePoint("currentLng","currentLat"), 4326)::public.geography));
