import { container } from "tsyringe"
import BaseMailerConnector from "./BaseMailerConnector"
import MailerConnectorComponent from "./MailerConnectorComponents"
import SESMailerConnector from "./SESMailerConnector"

const { ENVIRONMENT } = process.env
if (ENVIRONMENT === "local") {
  container.registerSingleton(
    MailerConnectorComponent.token,
    BaseMailerConnector,
  )
} else {
  container.registerSingleton(
    MailerConnectorComponent.token,
    SESMailerConnector,
  )
}

export default MailerConnectorComponent
