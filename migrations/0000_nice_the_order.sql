CREATE TYPE "public"."Language" AS ENUM('EN');--> statement-breakpoint
CREATE TABLE "Codes" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"maximumUses" integer DEFAULT 1 NOT NULL,
	"creationTimestamp" timestamp with time zone DEFAULT now() NOT NULL,
	"expirationTimestamp" timestamp with time zone,
	"lastEditTimestamp" timestamp with time zone,
	"authorUserId" integer,
	"targetUserId" integer,
	CONSTRAINT "Codes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "CodesUtilizations" (
	"id" serial PRIMARY KEY NOT NULL,
	"codeId" integer NOT NULL,
	"userId" integer,
	"timestamp" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "GlobalSettings" (
	"key" varchar(255) PRIMARY KEY NOT NULL,
	"value" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Sessions" (
	"sid" varchar(255) PRIMARY KEY NOT NULL,
	"data" json NOT NULL,
	"cookie" json NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	"authenticatedUserId" integer,
	"callerUserId" integer,
	"sessionId" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "Users" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(255) DEFAULT '' NOT NULL,
	"lastName" varchar(255) DEFAULT '' NOT NULL,
	"description" text,
	"email" varchar(255) NOT NULL,
	"password" varchar(255),
	"salt" varchar(255) NOT NULL,
	"blocked" boolean DEFAULT false NOT NULL,
	"emailVerified" boolean DEFAULT false NOT NULL,
	"creationTimestamp" timestamp with time zone DEFAULT now(),
	"deleted" boolean DEFAULT false NOT NULL,
	"type" varchar(255) NOT NULL,
	"privacyPolicyAcceptance" boolean NOT NULL,
	"termsConditionsAcceptance" boolean NOT NULL,
	"color" varchar(7) DEFAULT '#C452E7' NOT NULL,
	"devMode" boolean DEFAULT false NOT NULL,
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "Codes" ADD CONSTRAINT "Codes_authorUserId_Users_id_fk" FOREIGN KEY ("authorUserId") REFERENCES "public"."Users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Codes" ADD CONSTRAINT "Codes_targetUserId_Users_id_fk" FOREIGN KEY ("targetUserId") REFERENCES "public"."Users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "CodesUtilizations" ADD CONSTRAINT "CodesUtilizations_codeId_Codes_id_fk" FOREIGN KEY ("codeId") REFERENCES "public"."Codes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "CodesUtilizations" ADD CONSTRAINT "CodesUtilizations_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_authenticatedUserId_Users_id_fk" FOREIGN KEY ("authenticatedUserId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_callerUserId_Users_id_fk" FOREIGN KEY ("callerUserId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;