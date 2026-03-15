CREATE TABLE "RAGDocuments" (
	"id" serial PRIMARY KEY NOT NULL,
	"s3Key" varchar(1024) NOT NULL,
	"departmentId" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "RAGDocuments" ADD CONSTRAINT "RAGDocuments_departmentId_Departments_id_fk" FOREIGN KEY ("departmentId") REFERENCES "public"."Departments"("id") ON DELETE no action ON UPDATE no action;