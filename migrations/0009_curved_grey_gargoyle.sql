DROP TABLE "OrganizationUsers" CASCADE;--> statement-breakpoint
DROP TABLE "Organizations" CASCADE;--> statement-breakpoint
DROP TABLE "Projects" CASCADE;--> statement-breakpoint
ALTER TABLE "Tickets" ADD COLUMN "name" varchar(255);--> statement-breakpoint
UPDATE "Tickets" SET "name" = 'Untitled Ticket' WHERE "name" IS NULL;--> statement-breakpoint
ALTER TABLE "Tickets" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Tickets" ADD COLUMN "createdAt" timestamp with time zone DEFAULT now() NOT NULL;