CREATE TABLE "ChatMessageReferencedDocuments" (
	"id" serial PRIMARY KEY NOT NULL,
	"documentId" integer NOT NULL,
	"chatMessageId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ChatMessages" (
	"id" serial PRIMARY KEY NOT NULL,
	"prompt" text NOT NULL,
	"response" text NOT NULL,
	"chatId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ChatMessageReferencedDocuments" ADD CONSTRAINT "ChatMessageReferencedDocuments_chatMessageId_ChatMessages_id_fk" FOREIGN KEY ("chatMessageId") REFERENCES "public"."ChatMessages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ChatMessages" ADD CONSTRAINT "ChatMessages_chatId_Chats_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."Chats"("id") ON DELETE cascade ON UPDATE no action;