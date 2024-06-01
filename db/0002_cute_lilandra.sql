ALTER TABLE "leisures" ADD COLUMN "latitude" double precision;--> statement-breakpoint
ALTER TABLE "leisures" ADD COLUMN "longitude" double precision;--> statement-breakpoint
ALTER TABLE "places" ADD COLUMN "latitude" double precision NOT NULL;--> statement-breakpoint
ALTER TABLE "places" ADD COLUMN "longitude" double precision NOT NULL;--> statement-breakpoint
ALTER TABLE "weather_stations" ADD COLUMN "latitude" double precision NOT NULL;--> statement-breakpoint
ALTER TABLE "weather_stations" ADD COLUMN "longitude" double precision NOT NULL;--> statement-breakpoint
ALTER TABLE "leisures" DROP COLUMN IF EXISTS "coordinates";--> statement-breakpoint
ALTER TABLE "places" DROP COLUMN IF EXISTS "navigation";--> statement-breakpoint
ALTER TABLE "places" DROP COLUMN IF EXISTS "coordinates";--> statement-breakpoint
ALTER TABLE "weather_stations" DROP COLUMN IF EXISTS "coordinates";