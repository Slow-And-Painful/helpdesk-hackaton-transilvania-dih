CREATE TYPE "public"."Language" AS ENUM('EN');--> statement-breakpoint
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
	"chatId" integer NOT NULL,
	"inputTokens" integer DEFAULT 0 NOT NULL,
	"outputTokens" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Chats" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"departmentUserId" integer NOT NULL,
	"name" varchar(255),
	CONSTRAINT "Chats_uuid_unique" UNIQUE("uuid")
);
--> statement-breakpoint
CREATE TABLE "Codes" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"maximumUses" integer DEFAULT 1 NOT NULL,
	"creationTimestamp" timestamp with time zone DEFAULT now() NOT NULL,
	"expirationTimestamp" timestamp with time zone,
	"lastEditTimestamp" timestamp with time zone,
	"authorUserId" integer,
	"targetUserId" integer,
	CONSTRAINT "Codes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "CodesUtilizations" (
	"id" serial PRIMARY KEY NOT NULL,
	"codeId" integer NOT NULL,
	"userId" integer,
	"timestamp" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "DepartmentUsers" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"departmentId" integer NOT NULL,
	"userId" integer NOT NULL,
	"role" varchar(255) NOT NULL,
	CONSTRAINT "DepartmentUsers_departmentId_userId_unique" UNIQUE("departmentId","userId")
);
--> statement-breakpoint
CREATE TABLE "Departments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) DEFAULT '' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"systemPrompt" text DEFAULT '' NOT NULL,
	"aiDescription" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "DocumentFolders" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"departmentId" integer NOT NULL,
	"parentId" integer,
	"deletable" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "EmailLayouts" (
	"key" varchar(255) PRIMARY KEY NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "EmailTemplates" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(255) NOT NULL,
	"language" "Language" NOT NULL,
	"subject" text DEFAULT '' NOT NULL,
	"emailLayoutKey" varchar(255),
	"bodyPayload" jsonb,
	"body" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "GlobalSettings" (
	"key" varchar(255) PRIMARY KEY NOT NULL,
	"value" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Sessions" (
	"sid" varchar(255) PRIMARY KEY NOT NULL,
	"data" json NOT NULL,
	"cookie" json NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	"authenticatedUserId" integer,
	"callerUserId" integer,
	"sessionId" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "TicketMessages" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text,
	"senderDepartmentUserId" integer NOT NULL,
	"ticketId" integer NOT NULL,
	"sentAt" timestamp
);
--> statement-breakpoint
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
CREATE TABLE "Tickets" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"summary" varchar(1000),
	"senderDepartmentId" integer NOT NULL,
	"senderDepartmentUserId" integer,
	"destinationDepartmentId" integer NOT NULL,
	"assigneeId" integer,
	"status" varchar(255) DEFAULT 'open' NOT NULL,
	"priority" varchar(50) DEFAULT 'medie' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Users" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(255) DEFAULT '' NOT NULL,
	"lastName" varchar(255) DEFAULT '' NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255),
	"salt" varchar(255) NOT NULL,
	"blocked" boolean DEFAULT false NOT NULL,
	"emailVerified" boolean DEFAULT false NOT NULL,
	"creationTimestamp" timestamp with time zone DEFAULT now(),
	"type" varchar(255) NOT NULL,
	"privacyPolicyAcceptance" boolean NOT NULL,
	"termsConditionsAcceptance" boolean NOT NULL,
	"color" varchar(7) DEFAULT '#C452E7' NOT NULL,
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "RAGDocuments" (
	"id" serial PRIMARY KEY NOT NULL,
	"s3Key" varchar(1024) NOT NULL,
	"name" varchar(255) NOT NULL,
	"aiDescription" text DEFAULT '' NOT NULL,
	"extractedText" text DEFAULT '' NOT NULL,
	"extractionStatus" varchar(50) DEFAULT 'pending' NOT NULL,
	"extractionInputTokens" integer DEFAULT 0 NOT NULL,
	"extractionOutputTokens" integer DEFAULT 0 NOT NULL,
	"departmentId" integer NOT NULL,
	"folderId" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ChatMessageReferencedDocuments" ADD CONSTRAINT "ChatMessageReferencedDocuments_chatMessageId_ChatMessages_id_fk" FOREIGN KEY ("chatMessageId") REFERENCES "public"."ChatMessages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ChatMessages" ADD CONSTRAINT "ChatMessages_chatId_Chats_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."Chats"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Chats" ADD CONSTRAINT "Chats_departmentUserId_DepartmentUsers_id_fk" FOREIGN KEY ("departmentUserId") REFERENCES "public"."DepartmentUsers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Codes" ADD CONSTRAINT "Codes_authorUserId_Users_id_fk" FOREIGN KEY ("authorUserId") REFERENCES "public"."Users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Codes" ADD CONSTRAINT "Codes_targetUserId_Users_id_fk" FOREIGN KEY ("targetUserId") REFERENCES "public"."Users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "CodesUtilizations" ADD CONSTRAINT "CodesUtilizations_codeId_Codes_id_fk" FOREIGN KEY ("codeId") REFERENCES "public"."Codes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "CodesUtilizations" ADD CONSTRAINT "CodesUtilizations_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DepartmentUsers" ADD CONSTRAINT "DepartmentUsers_departmentId_Departments_id_fk" FOREIGN KEY ("departmentId") REFERENCES "public"."Departments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DepartmentUsers" ADD CONSTRAINT "DepartmentUsers_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DocumentFolders" ADD CONSTRAINT "DocumentFolders_departmentId_Departments_id_fk" FOREIGN KEY ("departmentId") REFERENCES "public"."Departments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DocumentFolders" ADD CONSTRAINT "DocumentFolders_parentId_DocumentFolders_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."DocumentFolders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "EmailTemplates" ADD CONSTRAINT "EmailTemplates_emailLayoutKey_EmailLayouts_key_fk" FOREIGN KEY ("emailLayoutKey") REFERENCES "public"."EmailLayouts"("key") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_authenticatedUserId_Users_id_fk" FOREIGN KEY ("authenticatedUserId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_callerUserId_Users_id_fk" FOREIGN KEY ("callerUserId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TicketMessages" ADD CONSTRAINT "TicketMessages_senderDepartmentUserId_DepartmentUsers_id_fk" FOREIGN KEY ("senderDepartmentUserId") REFERENCES "public"."DepartmentUsers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TicketMessages" ADD CONSTRAINT "TicketMessages_ticketId_Tickets_id_fk" FOREIGN KEY ("ticketId") REFERENCES "public"."Tickets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TicketSummaries" ADD CONSTRAINT "TicketSummaries_ticketId_Tickets_id_fk" FOREIGN KEY ("ticketId") REFERENCES "public"."Tickets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TicketSummaries" ADD CONSTRAINT "TicketSummaries_senderDepartmentId_Departments_id_fk" FOREIGN KEY ("senderDepartmentId") REFERENCES "public"."Departments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_senderDepartmentId_Departments_id_fk" FOREIGN KEY ("senderDepartmentId") REFERENCES "public"."Departments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_senderDepartmentUserId_DepartmentUsers_id_fk" FOREIGN KEY ("senderDepartmentUserId") REFERENCES "public"."DepartmentUsers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_destinationDepartmentId_Departments_id_fk" FOREIGN KEY ("destinationDepartmentId") REFERENCES "public"."Departments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_assigneeId_DepartmentUsers_id_fk" FOREIGN KEY ("assigneeId") REFERENCES "public"."DepartmentUsers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "RAGDocuments" ADD CONSTRAINT "RAGDocuments_departmentId_Departments_id_fk" FOREIGN KEY ("departmentId") REFERENCES "public"."Departments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "RAGDocuments" ADD CONSTRAINT "RAGDocuments_folderId_DocumentFolders_id_fk" FOREIGN KEY ("folderId") REFERENCES "public"."DocumentFolders"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "key_language_unique" ON "EmailTemplates" USING btree ("key","language");