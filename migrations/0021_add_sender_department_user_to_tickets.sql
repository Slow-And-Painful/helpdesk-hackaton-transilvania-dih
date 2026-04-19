ALTER TABLE "Tickets" ADD COLUMN "senderDepartmentUserId" integer;--> statement-breakpoint
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_senderDepartmentUserId_DepartmentUsers_id_fk" FOREIGN KEY ("senderDepartmentUserId") REFERENCES "public"."DepartmentUsers"("id") ON DELETE set null ON UPDATE no action;
