CREATE TABLE "EmailLayouts" (
	"key" varchar(255) PRIMARY KEY NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "EmailTemplates" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(255) NOT NULL,
	"language" "Language" NOT NULL,
	"subject" text DEFAULT '' NOT NULL,
	"emailLayoutKey" varchar(255),
	"bodyPayload" jsonb,
	"body" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "EmailTemplates" ADD CONSTRAINT "EmailTemplates_emailLayoutKey_EmailLayouts_key_fk" FOREIGN KEY ("emailLayoutKey") REFERENCES "public"."EmailLayouts"("key") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "key_language_unique" ON "EmailTemplates" USING btree ("key","language");