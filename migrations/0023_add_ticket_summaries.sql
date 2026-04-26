CREATE TABLE "TicketSummaries" (
  "id" serial PRIMARY KEY NOT NULL,
  "ticketId" integer NOT NULL UNIQUE,
  "senderDepartmentId" integer NOT NULL,
  "summary" text NOT NULL,
  "generatedAt" timestamp with time zone DEFAULT now() NOT NULL,
  "inputTokens" integer DEFAULT 0 NOT NULL,
  "outputTokens" integer DEFAULT 0 NOT NULL,
  CONSTRAINT "TicketSummaries_ticketId_Tickets_id_fk" FOREIGN KEY ("ticketId") REFERENCES "Tickets"("id") ON DELETE cascade,
  CONSTRAINT "TicketSummaries_senderDepartmentId_Departments_id_fk" FOREIGN KEY ("senderDepartmentId") REFERENCES "Departments"("id") ON DELETE cascade
);
