DO $$ BEGIN
 CREATE TYPE "public"."type" AS ENUM('golf course', 'camping', 'swimming pool');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forecasts" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"time" time NOT NULL,
	"temperature" integer NOT NULL,
	"wind" integer NOT NULL,
	"wind_direction" text NOT NULL,
	"perception" text NOT NULL,
	"weather_station_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "leisures" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"link" text NOT NULL,
	"coordinates" text NOT NULL,
	"type" "type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "places" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"navigation" text NOT NULL,
	"coordinates" text NOT NULL,
	"leisure_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "weather_stations" (
	"station_id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"coordinates" text NOT NULL,
	"place_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forecasts" ADD CONSTRAINT "forecasts_weather_station_id_weather_stations_station_id_fk" FOREIGN KEY ("weather_station_id") REFERENCES "public"."weather_stations"("station_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "places" ADD CONSTRAINT "places_leisure_id_leisures_id_fk" FOREIGN KEY ("leisure_id") REFERENCES "public"."leisures"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weather_stations" ADD CONSTRAINT "weather_stations_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
