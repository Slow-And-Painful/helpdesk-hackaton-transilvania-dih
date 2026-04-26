CREATE TABLE "TicketSummaries" (
	"id" serial PRIMARY KEY NOT NULL,
	"ticketId" integer NOT NULL,
	"senderDepartmentId" integer NOT NULL,
	"summary" text NOT NULL,
	"generatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"inputTokens" integer DEFAULT 0 NOT NULL,
	"outputTokens" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "TicketSummaries_ticketId_unique" UNIQUE("ticketId")
);
--> statement-breakpoint
ALTER TABLE "TicketSummaries" ADD CONSTRAINT "TicketSummaries_ticketId_Tickets_id_fk" FOREIGN KEY ("ticketId") REFERENCES "public"."Tickets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TicketSummaries" ADD CONSTRAINT "TicketSummaries_senderDepartmentId_Departments_id_fk" FOREIGN KEY ("senderDepartmentId") REFERENCES "public"."Departments"("id") ON DELETE cascade ON UPDATE no action;