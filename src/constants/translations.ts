export type Language = "en" | "ro"

type TranslationKeys =
  | "back"
  | "welcomeBack"
  | "signInToContinue"
  | "createAccount"
  | "getStartedWithFreeAccount"
  | "homeTitle"
  | "homeSubtitle"
  | "goToDashboard"
  | "getStarted"
  | "signIn"
  | "lightningFast"
  | "lightningFastDescription"
  | "securePrivate"
  | "securePrivateDescription"
  | "alwaysLearning"
  | "alwaysLearningDescription"

export const translations: Record<Language, Record<TranslationKeys, string>> = {
  en: {
    back: "Back",
    welcomeBack: "Welcome Back",
    signInToContinue: "Sign in to your account to continue",
    createAccount: "Create Account",
    getStartedWithFreeAccount: "Get started with your free account",
    homeTitle: "Transilvania Digital Innovation Hub",
    homeSubtitle: "Experience the power of intelligent assistance. Get answers, automate tasks, and boost your productivity.",
    goToDashboard: "Go to your dashboard",
    getStarted: "Get Started",
    signIn: "Sign In",
    lightningFast: "Lightning Fast",
    lightningFastDescription: "Get instant responses powered by cutting-edge AI technology",
    securePrivate: "Secure & Private",
    securePrivateDescription: "Your data is protected with enterprise-grade security",
    alwaysLearning: "Always Learning",
    alwaysLearningDescription: "Continuously improving to serve you better every day",
  },
  ro: {
    back: "Înapoi",
    welcomeBack: "Bine ai revenit",
    signInToContinue: "Conectează-te la contul tău pentru a continua",
    createAccount: "Creează cont",
    getStartedWithFreeAccount: "Începe cu contul tău gratuit",
    homeTitle: "Hubul de Inovare Digitală Transilvania",
    homeSubtitle: "Descoperă puterea asistenței inteligente. Obține răspunsuri, automatizează sarcini și crește-ți productivitatea.",
    goToDashboard: "Mergi la panoul tău",
    getStarted: "Începe acum",
    signIn: "Autentificare",
    lightningFast: "Foarte rapid",
    lightningFastDescription: "Primești răspunsuri instant, bazate pe tehnologie AI de ultimă generație",
    securePrivate: "Sigur și privat",
    securePrivateDescription: "Datele tale sunt protejate cu securitate la nivel enterprise",
    alwaysLearning: "Învață continuu",
    alwaysLearningDescription: "Se îmbunătățește constant pentru a te ajuta mai bine în fiecare zi",
  },
}