CREATE TABLE "TicketMessages" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text,
	"senderDepartmentUserId" integer NOT NULL,
	"ticketId" integer NOT NULL,
	"sentAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "TicketMessages" ADD CONSTRAINT "TicketMessages_senderDepartmentUserId_DepartmentUsers_id_fk" FOREIGN KEY ("senderDepartmentUserId") REFERENCES "public"."DepartmentUsers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TicketMessages" ADD CONSTRAINT "TicketMessages_ticketId_Tickets_id_fk" FOREIGN KEY ("ticketId") REFERENCES "public"."Tickets"("id") ON DELETE cascade ON UPDATE no action;