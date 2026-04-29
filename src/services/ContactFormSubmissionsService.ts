import { injectable } from "tsyringe"
import DrizzleDB from "$components/DrizzleDB"
import BaseService from "$services/BaseService"
import {
  contactFormSubmissionsTable,
  ContactFormSubmissionSchema,
  NewContactFormSubmissionSchema,
} from "$dbSchemas/ContactFormSubmissions"
import { PgColumn } from "drizzle-orm/pg-core"

@injectable()
export default class ContactFormSubmissionsService extends BaseService<
  typeof contactFormSubmissionsTable,
  number,
  ContactFormSubmissionSchema,
  ContactFormSubmissionSchema,
  NewContactFormSubmissionSchema
> {
  static token = "ContactFormSubmissionsService"

  mainTable = contactFormSubmissionsTable
  pk: PgColumn = contactFormSubmissionsTable.id

  constructor(drizzleDB: DrizzleDB) {
    super(drizzleDB)
  }
}
