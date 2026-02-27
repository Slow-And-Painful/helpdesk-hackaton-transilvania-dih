import apiKeySecurityHandler from "./apiKeySecurityHandler"
import basicAuthHandler from "./basicAuthHandler"
import recaptchaSecurityHandler from "./recaptchaSecurityHandler"
import sessionSecurityHandler from "./sessionSecurityHandler"

export default {
  apiKey: apiKeySecurityHandler,
  basicAuth: basicAuthHandler,
  recaptcha: recaptchaSecurityHandler,
  session: sessionSecurityHandler
}
