CREATE TABLE "Departments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Tickets" (
	"id" serial PRIMARY KEY NOT NULL,
	"senderDepartmentId" integer NOT NULL,
	"destinationDepartmentId" integer NOT NULL,
	"status" varchar(255) DEFAULT 'open' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_senderDepartmentId_Departments_id_fk" FOREIGN KEY ("senderDepartmentId") REFERENCES "public"."Departments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_destinationDepartmentId_Departments_id_fk" FOREIGN KEY ("destinationDepartmentId") REFERENCES "public"."Departments"("id") ON DELETE cascade ON UPDATE no action;