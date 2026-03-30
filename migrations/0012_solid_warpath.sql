ALTER TABLE "Chats" ADD COLUMN "uuid" uuid DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "Chats" ADD CONSTRAINT "Chats_uuid_unique" UNIQUE("uuid");