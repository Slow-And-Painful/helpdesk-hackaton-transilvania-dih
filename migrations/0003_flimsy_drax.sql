CREATE TABLE "Projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"description" text,
	"creationTimestamp" timestamp with time zone DEFAULT now() NOT NULL,
	"userId" integer
);
--> statement-breakpoint
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;