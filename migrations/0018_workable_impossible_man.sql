ALTER TABLE "ChatMessages" ADD COLUMN "inputTokens" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "ChatMessages" ADD COLUMN "outputTokens" integer DEFAULT 0 NOT NULL;