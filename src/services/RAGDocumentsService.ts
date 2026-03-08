import { eq } from "drizzle-orm"
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js"
import type * as schema from "$dbSchemas/Common"
import { ragDocumentsTable } from "$dbSchemas/ragDocuments"
import type { NewRAGDocumentsSchema, RAGDocumentsSchema } from "$dbSchemas/ragDocuments"

export class RAGDocumentsService {
  constructor(private readonly db: PostgresJsDatabase<typeof schema>) {}

  async create(input: Pick<NewRAGDocumentsSchema, "s3Key" | "departmentId">): Promise<RAGDocumentsSchema> {
    const [created] = await this.db.insert(ragDocumentsTable).values(input).returning()
    return created
  }

  async listByDepartment(departmentId: number): Promise<RAGDocumentsSchema[]> {
    return this.db
      .select()
      .from(ragDocumentsTable)
      .where(eq(ragDocumentsTable.departmentId, departmentId))
  }

  async getById(id: number): Promise<RAGDocumentsSchema | undefined> {
    const [doc] = await this.db.select().from(ragDocumentsTable).where(eq(ragDocumentsTable.id, id))
    return doc
  }

  async deleteById(id: number): Promise<RAGDocumentsSchema | undefined> {
    const [deleted] = await this.db
      .delete(ragDocumentsTable)
      .where(eq(ragDocumentsTable.id, id))
      .returning()
    return deleted
  }
}