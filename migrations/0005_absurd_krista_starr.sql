CREATE TABLE "Chats" (
	"id" serial PRIMARY KEY NOT NULL,
	"departmentUserId" integer NOT NULL,
	CONSTRAINT "Chats_departmentUserId_unique" UNIQUE("departmentUserId")
);
--> statement-breakpoint
ALTER TABLE "Chats" ADD CONSTRAINT "Chats_departmentUserId_DepartmentUsers_id_fk" FOREIGN KEY ("departmentUserId") REFERENCES "public"."DepartmentUsers"("id") ON DELETE cascade ON UPDATE no action;