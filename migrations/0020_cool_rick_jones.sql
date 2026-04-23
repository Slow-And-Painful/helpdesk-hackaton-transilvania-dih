CREATE TABLE "DocumentFolders" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"departmentId" integer NOT NULL,
	"parentId" integer,
	"deletable" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "RAGDocuments" ADD COLUMN "folderId" integer;--> statement-breakpoint
ALTER TABLE "DocumentFolders" ADD CONSTRAINT "DocumentFolders_departmentId_Departments_id_fk" FOREIGN KEY ("departmentId") REFERENCES "public"."Departments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DocumentFolders" ADD CONSTRAINT "DocumentFolders_parentId_DocumentFolders_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."DocumentFolders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "RAGDocuments" ADD CONSTRAINT "RAGDocuments_folderId_DocumentFolders_id_fk" FOREIGN KEY ("folderId") REFERENCES "public"."DocumentFolders"("id") ON DELETE set null ON UPDATE no action;