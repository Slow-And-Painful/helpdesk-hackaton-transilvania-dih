CREATE TABLE "DepartmentUsers" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"departmentId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "DepartmentUsers_departmentId_userId_unique" UNIQUE("departmentId","userId")
);
--> statement-breakpoint
CREATE TABLE "Departments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) DEFAULT '' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "DepartmentUsers" ADD CONSTRAINT "DepartmentUsers_departmentId_Departments_id_fk" FOREIGN KEY ("departmentId") REFERENCES "public"."Departments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DepartmentUsers" ADD CONSTRAINT "DepartmentUsers_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;