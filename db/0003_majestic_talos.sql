ALTER TABLE "places" DROP CONSTRAINT "places_leisure_id_leisures_id_fk";
--> statement-breakpoint
ALTER TABLE "leisures" ADD COLUMN "place_id" integer;--> statement-breakpoint
ALTER TABLE "places" ADD COLUMN "link" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "leisures" ADD CONSTRAINT "leisures_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "places" DROP COLUMN IF EXISTS "leisure_id";