ALTER TABLE "RAGDocuments" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "RAGDocuments" ADD COLUMN "aiDescription" text DEFAULT '' NOT NULL;