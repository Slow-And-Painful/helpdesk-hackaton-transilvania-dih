import EmailTemplatesService from "$services/EmailTemplatesService"
import { container } from "tsyringe"
import yargsParser from "yargs-parser"
import { join } from "path"
import { readFileSync, readdirSync } from "fs"
import EmailLayoutsService from "$services/EmailLayoutsService"
import LANGUAGES from "$types/LANGUAGES"
import { CommonPgDatabase, CommonTransaction } from "$services/BaseService"
import { sql } from "drizzle-orm"
import DrizzleDB from "$components/DrizzleDB"

declare module "yargs-parser" {
  interface Arguments {
    emailsFolderPath?: string
  }
}

type UploadLocalEmailsResult = {
  layouts: {
    key: string
    templates: string[]
  }[]
  custom: string[]
}

const DEFAULT_EMAILS_FOLDER_PATH = join(__dirname, "emails")

export const seedEmails = async (
  db: CommonPgDatabase | CommonTransaction,
  options?: {
    emailsFolderPath?: string
  }
): Promise<UploadLocalEmailsResult> => {
  // Reset tables
  await db.execute(
    sql.raw(`TRUNCATE TABLE "EmailTemplates" RESTART IDENTITY CASCADE;`)
  )
  await db.execute(
    sql.raw(`TRUNCATE TABLE "EmailLayouts" RESTART IDENTITY CASCADE;`)
  )
  console.log("Done truncating")

  const out: UploadLocalEmailsResult = {
    layouts: [],
    custom: [],
  }

  const emailTemplatesService = container.resolve<EmailTemplatesService>(
    EmailTemplatesService.token,
  )
  const emailLayoutsService = container.resolve<EmailLayoutsService>(
    EmailLayoutsService.token,
  )

  const emailsFolderPath =
    options?.emailsFolderPath || DEFAULT_EMAILS_FOLDER_PATH
  const layoutsFolderPath = join(emailsFolderPath, "layouts")
  const customFolderPath = join(emailsFolderPath, "custom")

  const layoutKeys = readdirSync(layoutsFolderPath)
  const customKeys = readdirSync(customFolderPath)

  for (const layoutKey of layoutKeys) {
    const layoutFolderPath = join(layoutsFolderPath, layoutKey)
    const layoutPath = join(layoutFolderPath, "layout_body.mjml")
    const layoutContent = readFileSync(layoutPath, "utf8")
    await emailLayoutsService.insert({
      key: layoutKey,
      content: layoutContent,
    })

    const templatesFolderPath = join(layoutFolderPath, "templates")
    const templatesKeys = readdirSync(templatesFolderPath)

    for (const templateKey of templatesKeys) {
      const templateFolderPath = join(templatesFolderPath, templateKey)
      const languagesKeys = readdirSync(templateFolderPath)

      for (const languageKey of languagesKeys) {
        const languageFolderPath = join(templateFolderPath, languageKey)
        const templatePartials = readdirSync(languageFolderPath)
        const language = languageKey as LANGUAGES

        if (!templatePartials.includes("subject")) {
          throw new Error(`Template ${templateKey} is missing subject file`)
        }

        // remove subject from templatePartials
        templatePartials.splice(templatePartials.indexOf("subject"), 1)
        const subjectPath = join(languageFolderPath, "subject")
        const subject = readFileSync(subjectPath, "utf8")

        const bodyPayload: {
          [key: string]: string
        } = {}

        for (const partialKey of templatePartials) {
          const partialPath = join(languageFolderPath, partialKey)
          const partialContent = readFileSync(partialPath, "utf8")
          bodyPayload[partialKey.split(".")[0]] = partialContent
        }

        await emailTemplatesService.insert({
          subject,
          emailLayoutKey: layoutKey,
          key: templateKey,
          bodyPayload,
          language: language,
        })
        console.log(`Template ${templateKey} for layout ${layoutKey} in language ${language} uploaded successfully.`)

        out.layouts.push({
          key: layoutKey,
          templates: templatesKeys,
        })
      }
    }
  }

  for (const customKey of customKeys) {
    const customPath = join(customFolderPath, customKey)
    const languagesKeys = readdirSync(customPath)

    for (const languageKey of languagesKeys) {
      const languageFolderPath = join(customPath, languageKey)
      const bodyPath = join(languageFolderPath, "body.mjml")
      const subjectPath = join(languageFolderPath, "subject")
      const language = languageKey as LANGUAGES

      const body = readFileSync(bodyPath, "utf8")
      const subject = readFileSync(subjectPath, "utf8")

      await emailTemplatesService.insert({
        key: customKey,
        language: language,
        body,
        subject,
      })
      out.custom.push(customKey)
    }
  }

  return out
}

if (require.main === module) {
  void (async () => {
    const argv = yargsParser(process.argv.slice(2))

    const drizzleDB = container.resolve<DrizzleDB>(DrizzleDB.token)

    const res = await seedEmails(drizzleDB.drizzle, argv)

    console.log("===============================================")
    console.log("Emails uploaded successfully!\n\n")

    for (const layout of res.layouts) {
      console.log(`Layout ${layout.key}:`)
      for (const template of layout.templates) {
        console.log(` - ${template}`)
      }
      console.log()
    }

    console.log("Custom:")
    for (const custom of res.custom) {
      console.log(` - ${custom}`)
    }

    console.log("==============================================")

    process.exit(0)
  })()
}