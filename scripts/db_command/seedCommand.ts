import { container } from "tsyringe"
import Configs from "$components/Configs"

import UsersService from "$services/UsersService"
import DepartmentsService from "$services/DepartmentsService"
import DepartmentUserService from "$services/DepartmentUsersService"
import PostgresDB from "$components/PostgresDB"
import { CommandHandler } from "./index"
import USER_TYPE from "$types/USER_TYPE"
import { DEPARTMENT_USER_ROLE } from "$types/departments"

// ---------------------------------------------------------------------------
// Predefined departments with Romanian names, system prompts and AI descriptions
// ---------------------------------------------------------------------------

const DEPARTMENTS_DATA = [
  {
    name: "Resurse Umane",
    systemPrompt:
      "Ești asistentul virtual al Departamentului de Resurse Umane. Ajuți angajații și cetățenii cu întrebări legate de recrutare, contracte de muncă, concedii, evaluări de performanță și proceduri interne de personal. Răspunde profesionist, empatic și conform legislației muncii din România.",
    aiDescription: `Departamentul Resurse Umane al primăriei gestionează întregul ciclu de viață al personalului instituției, de la recrutare și selecție până la încetarea raporturilor de muncă.

Responsabilități principale:
- Recrutare și selecție: organizarea concursurilor și examenelor pentru ocuparea posturilor vacante, conform HG 611/2008 privind funcționarii publici și Codului Muncii pentru personalul contractual.
- Evidența personalului: menținerea dosarelor profesionale, actualizarea Registrului General de Evidență a Salariaților (REVISAL), gestiunea fișelor de post.
- Contracte și acte adiționale: întocmirea, modificarea și încetarea contractelor individuale de muncă și a rapoartelor de serviciu.
- Concedii și absențe: gestionarea cererilor de concediu de odihnă, medical, de maternitate/paternitate, fără plată și a altor tipuri de absențe.
- Salarizare și sporuri: calculul drepturilor salariale conform Legii-cadru nr. 153/2017, inclusiv sporuri de vechime, confidențialitate, condiții speciale.
- Evaluarea performanțelor: coordonarea procedurii anuale de evaluare a funcționarilor publici și a personalului contractual.
- Formare profesională: identificarea nevoilor de instruire și organizarea programelor de formare continuă.
- Disciplină și sancțiuni: instrumentarea procedurilor disciplinare conform legislației în vigoare.

Legislație de referință: Legea nr. 188/1999 privind Statutul funcționarilor publici, Legea nr. 53/2003 – Codul Muncii, Legea nr. 153/2017 privind salarizarea personalului plătit din fonduri publice.`,
    users: [
      { firstName: "Andreea", lastName: "Constantin", email: "andreea.constantin@primarie.ro", role: DEPARTMENT_USER_ROLE.ADMIN },
      { firstName: "Mihai", lastName: "Popescu", email: "mihai.popescu@primarie.ro", role: DEPARTMENT_USER_ROLE.MEMBER },
      { firstName: "Elena", lastName: "Ionescu", email: "elena.ionescu@primarie.ro", role: DEPARTMENT_USER_ROLE.MEMBER },
    ],
  },
  {
    name: "Achiziții Publice",
    systemPrompt:
      "Ești asistentul virtual al Departamentului de Achiziții Publice. Oferi suport cu privire la procedurile de achiziție, licitații, SEAP, caietele de sarcini și respectarea legislației privind achizițiile publice (Legea 98/2016). Răspunde clar și conform reglementărilor în vigoare.",
    aiDescription: `Departamentul Achiziții Publice planifică, organizează și monitorizează toate procedurile de atribuire a contractelor de achiziție publică ale instituției, asigurând conformitatea cu legislația națională și europeană.

Responsabilități principale:
- Programul anual al achizițiilor: elaborarea și actualizarea planului de achiziții pe baza referatelor de necesitate primite de la celelalte departamente.
- Proceduri de atribuire: organizarea licitațiilor deschise, negocierilor fără publicare prealabilă, procedurilor simplificate și achizițiilor directe prin SEAP/SICAP.
- Documentație de atribuire: redactarea caietelor de sarcini, fișelor de date, criteriilor de calificare și de atribuire, în colaborare cu departamentele beneficiare.
- Evaluarea ofertelor: constituirea și coordonarea comisiilor de evaluare, analiza ofertelor tehnice și financiare, întocmirea rapoartelor de atribuire.
- Contracte și acte adiționale: finalizarea, semnarea și monitorizarea executării contractelor, inclusiv recepția produselor, serviciilor și lucrărilor.
- Contestații și litigii: gestionarea contestațiilor depuse la CNSC și a litigiilor aferente procedurilor de achiziție.
- Raportare și transparență: publicarea anunțurilor, rezultatelor și contractelor în SEAP, transmiterea rapoartelor către ANAP.

Legislație de referință: Legea nr. 98/2016 privind achizițiile publice, HG nr. 395/2016 – Normele metodologice, Legea nr. 101/2016 privind remediile și căile de atac în materie de achiziții.`,
    users: [
      { firstName: "Bogdan", lastName: "Dumitrescu", email: "bogdan.dumitrescu@primarie.ro", role: DEPARTMENT_USER_ROLE.ADMIN },
      { firstName: "Cristina", lastName: "Marin", email: "cristina.marin@primarie.ro", role: DEPARTMENT_USER_ROLE.MEMBER },
      { firstName: "Radu", lastName: "Gheorghe", email: "radu.gheorghe@primarie.ro", role: DEPARTMENT_USER_ROLE.MEMBER },
    ],
  },
  {
    name: "Urbanism și Amenajarea Teritoriului",
    systemPrompt:
      "Ești asistentul virtual al Departamentului de Urbanism și Amenajarea Teritoriului. Ajuți cetățenii și firmele cu informații despre autorizații de construire, certificate de urbanism, PUG, PUZ, reglementări zonale și proceduri de avizare. Răspunde precis și conform legislației urbanistice.",
    aiDescription: `Departamentul Urbanism și Amenajarea Teritoriului reglementează utilizarea terenurilor și construcțiilor de pe raza administrativ-teritorială, emițând actele necesare pentru orice intervenție asupra imobilelor.

Responsabilități principale:
- Certificate de urbanism: emiterea certificatelor care atestă regimul juridic, economic și tehnic al imobilelor, necesare pentru diverse autorizări sau tranzacții imobiliare.
- Autorizații de construire și desființare: analizarea documentațiilor tehnice (DTAC, DTAD) și emiterea autorizațiilor pentru construcții noi, extinderi, consolidări sau demolări.
- Planuri Urbanistice: avizarea și aprobarea Planurilor Urbanistice Zonale (PUZ) și de Detaliu (PUD), actualizarea Planului Urbanistic General (PUG) al localității.
- Regularizarea construcțiilor: verificarea conformității lucrărilor executate cu prevederile autorizațiilor emise, soluționarea construcțiilor realizate fără autorizație.
- Nomenclatură stradală și adrese: atribuirea de denumiri străzilor și numerelor poștale.
- Avize de amplasament: emiterea avizelor pentru reclame, panouri publicitare, terase și alte amenajări temporare.
- Receptia lucrărilor: participarea la recepțiile la terminarea lucrărilor și întocmirea proceselor-verbale.

Documente frecvent solicitate: certificat de urbanism, autorizație de construire, notificare desființare, plan de situație vizat, acord vecini.

Legislație de referință: Legea nr. 350/2001 privind amenajarea teritoriului și urbanismul, Legea nr. 50/1991 privind autorizarea executării lucrărilor de construcții, Ordinul MDRT nr. 839/2009.`,
    users: [
      { firstName: "Oana", lastName: "Stanciu", email: "oana.stanciu@primarie.ro", role: DEPARTMENT_USER_ROLE.ADMIN },
      { firstName: "Alexandru", lastName: "Popa", email: "alexandru.popa@primarie.ro", role: DEPARTMENT_USER_ROLE.MEMBER },
    ],
  },
  {
    name: "Finanțe și Buget",
    systemPrompt:
      "Ești asistentul virtual al Departamentului de Finanțe și Buget. Oferi informații despre bugetul local, execuția bugetară, impozite și taxe locale, proceduri de plată și rapoarte financiare. Răspunde corect, transparent și conform normelor financiar-contabile publice.",
    aiDescription: `Departamentul Finanțe și Buget asigură gestiunea financiară a instituției, de la elaborarea bugetului local până la execuția, monitorizarea și raportarea acestuia, precum și administrarea veniturilor proprii.

Responsabilități principale:
- Elaborarea bugetului local: fundamentarea și întocmirea proiectului de buget anual pe baza propunerilor ordonatorilor terțiari de credite, în conformitate cu clasificația bugetară.
- Execuția bugetară: urmărirea încadrării cheltuielilor în creditele bugetare aprobate, angajarea, lichidarea, ordonanțarea și plata cheltuielilor (ALOP).
- Impozite și taxe locale: stabilirea, constatarea, controlul și încasarea impozitelor pe clădiri, terenuri, mijloace de transport și a altor taxe locale conform Codului Fiscal.
- Contabilitate publică: înregistrarea operațiunilor contabile, întocmirea balanțelor de verificare și a situațiilor financiare trimestriale și anuale.
- Gestiunea datoriei publice locale: monitorizarea împrumuturilor contractate, calculul și plata serviciului datoriei.
- Raportări și control: transmiterea rapoartelor periodice către Trezoreria Statului, Curtea de Conturi și Ministerul Finanțelor; pregătirea pentru auditul financiar.
- Vize CFP: exercitarea controlului financiar preventiv propriu asupra documentelor care angajează fonduri publice.

Informații utile pentru cetățeni: plata impozitelor se poate efectua la casieria instituției, prin virament bancar sau online pe platforma ghișeul.ro.

Legislație de referință: Legea nr. 273/2006 privind finanțele publice locale, Legea nr. 227/2015 – Codul Fiscal, Legea nr. 82/1991 – Legea contabilității.`,
    users: [
      { firstName: "Ioana", lastName: "Florescu", email: "ioana.florescu@primarie.ro", role: DEPARTMENT_USER_ROLE.ADMIN },
      { firstName: "Vasile", lastName: "Dănilă", email: "vasile.danila@primarie.ro", role: DEPARTMENT_USER_ROLE.MEMBER },
      { firstName: "Monica", lastName: "Toma", email: "monica.toma@primarie.ro", role: DEPARTMENT_USER_ROLE.MEMBER },
    ],
  },
  {
    name: "Asistență Socială",
    systemPrompt:
      "Ești asistentul virtual al Departamentului de Asistență Socială. Oferi sprijin cu privire la ajutoarele sociale, alocații, indemnizații, servicii pentru persoane vulnerabile, persoane cu dizabilități și vârstnici. Răspunde cu empatie și conform legislației de asistență socială.",
    aiDescription: `Departamentul Asistență Socială identifică, evaluează și sprijină persoanele și familiile aflate în dificultate, coordonând atât acordarea beneficiilor de asistență socială, cât și furnizarea serviciilor sociale de pe raza localității.

Responsabilități principale:
- Anchete sociale: efectuarea anchetelor sociale necesare pentru diverse beneficii (ajutor social, alocații, handicap, plasament familial, adopție etc.).
- Ajutor social (venit minim garantat): primirea cererilor, verificarea eligibilității și stabilirea dreptului la ajutor social conform Legii nr. 416/2001.
- Alocații și indemnizații: procesarea cererilor pentru alocația de stat pentru copii, indemnizația de creștere a copilului, stimulentul de inserție.
- Persoane cu dizabilități: evaluarea și certificarea gradului de handicap, acordarea prestațiilor și facilitarea accesului la servicii specializate.
- Persoane vârstnice: coordonarea serviciilor de îngrijire la domiciliu, colaborarea cu centrele rezidențiale și de zi pentru seniori.
- Violență domestică și situații de risc: intervenția în cazuri de violență în familie, luarea în evidență a copiilor în risc, colaborarea cu DGASPC.
- Cantina socială: gestionarea listelor de beneficiari ai serviciului de masă caldă sau hrană la domiciliu.
- Ajutoare de urgență și ajutoare pentru încălzire: procesarea cererilor sezoniere și a celor pentru situații excepționale.

Acte necesare frecvent: cerere tip, acte de identitate, adeverință venituri, acte de proprietate/chirie, certificate medicale (după caz).

Legislație de referință: Legea nr. 292/2011 – Legea asistenței sociale, Legea nr. 416/2001 privind venitul minim garantat, Legea nr. 448/2006 privind protecția persoanelor cu handicap.`,
    users: [
      { firstName: "Laura", lastName: "Neagu", email: "laura.neagu@primarie.ro", role: DEPARTMENT_USER_ROLE.ADMIN },
      { firstName: "Daniela", lastName: "Radu", email: "daniela.radu@primarie.ro", role: DEPARTMENT_USER_ROLE.MEMBER },
    ],
  },
  {
    name: "Registratură și Relații cu Publicul",
    systemPrompt:
      "Ești asistentul virtual al Departamentului de Registratură și Relații cu Publicul. Ajuți cetățenii să înregistreze cereri, să urmărească stadiul petițiilor, să obțină informații despre programul instituției și să fie direcționați corect către departamentele competente. Răspunde amabil și eficient.",
    aiDescription: `Departamentul Registratură și Relații cu Publicul reprezintă punctul principal de contact între cetățeni și instituție, asigurând primirea, înregistrarea și direcționarea tuturor documentelor, precum și accesul la informații de interes public.

Responsabilități principale:
- Primirea și înregistrarea documentelor: toate cererile, petițiile, sesizările și documentele depuse de cetățeni sau instituții sunt înregistrate cu număr unic de intrare și redirecționate către departamentele competente.
- Eliberarea răspunsurilor: comunicarea către solicitanți a răspunsurilor elaborate de departamentele de specialitate, în termenele legale.
- Informații de interes public (Legea 544/2001): primirea și soluționarea cererilor de acces la informații publice; publicarea și actualizarea informațiilor din oficiu pe site-ul instituției.
- Petiții și reclamații: înregistrarea și urmărirea soluționării petițiilor conform OG nr. 27/2002; notificarea petentului cu privire la stadiul și rezultatul analizei.
- Programul de audiențe: organizarea și gestionarea agendei de audiențe ale conducerii instituției.
- Ghișeu unic: îndrumarea cetățenilor către departamentul potrivit, oferirea de informații generale despre serviciile instituției, taxe, termene și proceduri.
- Arhivă curentă: păstrarea temporară și predarea periodică a documentelor la arhiva generală a instituției conform Legii Arhivelor Naționale.

Program de lucru cu publicul: Luni–Vineri, 08:30–16:30. Depunerea documentelor se poate face fizic la ghișeu, prin poștă sau prin e-mail la adresa oficială a instituției.

Legislație de referință: Legea nr. 544/2001 privind liberul acces la informațiile de interes public, OG nr. 27/2002 privind reglementarea activității de soluționare a petițiilor, Legea nr. 16/1996 a Arhivelor Naționale.`,
    users: [
      { firstName: "Florina", lastName: "Apostol", email: "florina.apostol@primarie.ro", role: DEPARTMENT_USER_ROLE.ADMIN },
      { firstName: "George", lastName: "Manolache", email: "george.manolache@primarie.ro", role: DEPARTMENT_USER_ROLE.MEMBER },
      { firstName: "Simona", lastName: "Vlad", email: "simona.vlad@primarie.ro", role: DEPARTMENT_USER_ROLE.MEMBER },
    ],
  },
  {
    name: "Juridic și Contencios Administrativ",
    systemPrompt:
      "Ești asistentul virtual al Departamentului Juridic și Contencios Administrativ. Oferi informații despre litigii administrative, avize juridice, contracte, hotărâri de consiliu local și recursuri. Răspunde precis, conform legislației române și jurisprudenței relevante.",
    aiDescription: `Departamentul Juridic și Contencios Administrativ asigură legalitatea activității instituției, oferind consultanță juridică internă, avizând actele administrative și reprezentând instituția în fața instanțelor judecătorești.

Responsabilități principale:
- Avizare juridică: analizarea și avizarea pentru legalitate a proiectelor de hotărâri de consiliu local, a dispozițiilor primarului, contractelor și altor acte administrative emise de instituție.
- Reprezentare în instanță: asigurarea reprezentării instituției în litigiile de contencios administrativ, civil, muncă și în orice alte procese în care instituția este parte.
- Consultanță juridică internă: oferirea de opinii juridice departamentelor instituției cu privire la interpretarea și aplicarea actelor normative.
- Contracte: redactarea, analizarea și negocierea contractelor de orice natură (prestări servicii, furnizare, lucrări, asociere, parteneriat public-privat).
- Recuperare creanțe: inițierea și urmărirea procedurilor judiciare sau extrajudiciare pentru recuperarea debitelor față de instituție.
- Hotărâri judecătorești: urmărirea punerii în executare a hotărârilor judecătorești și comunicarea acestora departamentelor implicate.
- Legislație și jurisprudență: monitorizarea modificărilor legislative relevante și informarea conducerii și departamentelor cu privire la impactul acestora.
- Acte normative locale: coordonarea procesului de elaborare a regulamentelor, statutelor și a altor acte normative locale.

Notă importantă: Departamentul Juridic oferă consultanță exclusiv instituției, nu cetățenilor. Cetățenii care au nevoie de asistență juridică sunt îndrumați către barou sau serviciile de asistență juridică gratuită prevăzute de lege.

Legislație de referință: Legea nr. 554/2004 – Legea contenciosului administrativ, OUG nr. 57/2019 – Codul Administrativ, Legea nr. 287/2009 – Codul Civil.`,
    users: [
      { firstName: "Marian", lastName: "Chiriac", email: "marian.chiriac@primarie.ro", role: DEPARTMENT_USER_ROLE.ADMIN },
      { firstName: "Alina", lastName: "Ciobanu", email: "alina.ciobanu@primarie.ro", role: DEPARTMENT_USER_ROLE.MEMBER },
    ],
  },
]

// ---------------------------------------------------------------------------
// Staff users
// ---------------------------------------------------------------------------

const STAFF_USERS = [
  { firstName: "Adrian", lastName: "Moldovan", email: "adrian.moldovan@primarie.ro" },
  { firstName: "Roxana", lastName: "Petrescu", email: "roxana.petrescu@primarie.ro" },
]

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

const seed = async () => {
  container.resolve<Configs>(Configs.token)

  const usersService = container.resolve<UsersService>(UsersService.token)
  const departmentsService = container.resolve<DepartmentsService>(DepartmentsService.token)
  const departmentUserService = container.resolve<DepartmentUserService>(DepartmentUserService.token)

  console.log("Seeding staff users...")
  for (const staffData of STAFF_USERS) {
    console.log(`  Seeding staff: ${staffData.firstName} ${staffData.lastName}`)
    await usersService.insert([
      {
        firstName: staffData.firstName,
        lastName: staffData.lastName,
        email: staffData.email,
        password: "password123",
        type: USER_TYPE.STAFF,
        privacyPolicyAcceptance: true,
        termsConditionsAcceptance: true,
        emailVerified: true,
      },
    ])
  }

  for (const deptData of DEPARTMENTS_DATA) {
    console.log(`Seeding department: ${deptData.name}`)

    const [department] = await departmentsService.insert([
      {
        name: deptData.name,
        systemPrompt: deptData.systemPrompt,
        aiDescription: deptData.aiDescription,
      },
    ])

    for (const userData of deptData.users) {
      console.log(`  Seeding user: ${userData.firstName} ${userData.lastName} (${userData.role})`)

      const [user] = await usersService.insert([
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: "password123",
          type: USER_TYPE.CUSTOMER,
          privacyPolicyAcceptance: true,
          termsConditionsAcceptance: true,
          emailVerified: true,
        },
      ])

      await departmentUserService.insert([
        {
          userId: user.id,
          departmentId: department.id,
          role: userData.role,
        },
      ])
    }
  }

  console.log("Seeding completed.")
}

const seedCommandHandler: CommandHandler = async ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  drizzle,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  env,
  postgres,
}) => {
  const postgresDB = container.resolve<PostgresDB>(PostgresDB.token)
  postgresDB.sql = postgres

  await seed()
}

export default seedCommandHandler
