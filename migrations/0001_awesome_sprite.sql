CREATE TABLE "OrganizationUsers" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"organizationId" integer NOT NULL,
	"blocked" boolean DEFAULT false NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "OrganizationUsers_organizationId_userId_unique" UNIQUE("organizationId","userId")
);
--> statement-breakpoint
CREATE TABLE "Organizations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) DEFAULT '' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "OrganizationUsers" ADD CONSTRAINT "OrganizationUsers_organizationId_Organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."Organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "OrganizationUsers" ADD CONSTRAINT "OrganizationUsers_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Users" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "Users" DROP COLUMN "deleted";--> statement-breakpoint
ALTER TABLE "Users" DROP COLUMN "devMode";