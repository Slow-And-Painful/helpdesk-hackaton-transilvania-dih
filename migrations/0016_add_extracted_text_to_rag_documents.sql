ALTER TABLE "RAGDocuments" ADD COLUMN "extractedText" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "RAGDocuments" ADD COLUMN "extractionStatus" varchar(50) DEFAULT 'pending' NOT NULL;
