import type { QuestionStep } from "./types";

export const QUESTIONS: QuestionStep[] = [
  {
    id: "q1-sex-at-birth",
    type: "single-choice",
    title: "What sex were you assigned at birth?",
    options: [
      { id: "male", label: "Male" },
      { id: "female", label: "Female" },
    ],
    required: true,
  },
  {
    id: "q2-erection-frequency",
    type: "single-choice",
    title: "How often do you have difficulty getting/maintaining an erection?",
    options: [
      { id: "occasionally", label: "Occasionally" },
      { id: "regularly", label: "Regularly" },
      { id: "rarely", label: "Rarely" },
    ],
    required: true,
  },
  {
    id: "q3-ed-medication-history",
    type: "yes-no",
    title: "Have you taken any medication to treat erectile dysfunction in the past 12 months?",
    required: true,
  },
  {
    id: "q4-previous-medication",
    type: "single-choice",
    title: "Name of the medication",
    subtitle: "If you have taken ED medication recently, choose the closest match.",
    options: [
      { id: "viagra-25", label: "Viagra, 25 mg" },
      { id: "viagra-50", label: "Viagra, 50 mg" },
      { id: "viagra-100", label: "Viagra, 100 mg" },
      { id: "other", label: "Can't find your medicine?" },
    ],
  },
  {
    id: "q5-medical-contraindications",
    type: "multi-choice",
    title: "Do any of the following apply to you?",
    options: [
      { id: "none", label: "None of the below" },
      {
        id: "angina-nitrates",
        label:
          "Angina treated with daily nitrate medication (e.g. Pentalong, Monoket, Corvaton, Molsidomine, Imdur, Nicorandil)",
      },
      { id: "stroke-heart-attack", label: "Stroke or heart attack within the last 6 months" },
      {
        id: "blood-pressure",
        label: "Low blood pressure (<90/50 mmHg), untreated or uncontrolled high blood pressure",
      },
      { id: "liver-disease", label: "Liver disease" },
      { id: "penile-abnormalities", label: "Penile abnormalities" },
      { id: "retinopathy", label: "Ischaemic retinopathy" },
      { id: "substance-misuse", label: "Alcohol and/or drug misuse" },
      { id: "poppers", label: "Amyl nitrite (“poppers”)" },
      { id: "riociguat", label: "Riociguat (Adempas)" },
    ],
    required: true,
  },
  {
    id: "q6-medicine-interactions",
    type: "multi-choice",
    title: "Are you taking any of the following medicines or treatments?",
    options: [
      { id: "none", label: "None of the below" },
      { id: "sickle-cell", label: "Sickle cell disease" },
      { id: "haemodialysis", label: "Haemodialysis" },
      { id: "alpha-blockers", label: "Alfuzosin, Doxazosin, Terazosin, Prazosin, Urapidil" },
      {
        id: "cyp3a4",
        label:
          "CYP3A4 inhibitors (ketoconazole, itraconazole, posaconazole, voriconazole, clarithromycin, erythromycin, ciprofloxacin)",
      },
      {
        id: "hiv-hepatitis",
        label: "HIV or hepatitis treatment (cobicistat, ritonavir or other antiretroviral medicines)",
      },
      { id: "bosentan", label: "Bosentan (Tracleer)" },
    ],
    required: true,
  },
  {
    id: "q7-gp-acknowledgement",
    type: "checkbox",
    title:
      "I understand that it is advisable to inform my GP about this treatment to help prevent potential negative effects on future treatments and/or health issues.",
    subtitle:
      "We can also inform your GP on your behalf. If you would like us to do so, please email your GP’s contact details to support@healthandgo.com.",
    options: [{ id: "acknowledge", label: "I understand" }],
    required: true,
  },
  {
    id: "q8-additional-information-choice",
    type: "yes-no",
    title: "Would you like to provide the doctor with any additional information?",
    required: true,
  },
  {
    id: "q9-additional-information",
    type: "textarea",
    title: "Would you like to provide the doctor with any additional information?",
    placeholder: "Type your answer here",
  },
  {
    id: "q10-allergies",
    type: "text",
    title: "Please list all substances you are allergic to.",
    placeholder: "Type your answer here",
  },
  {
    id: "q11-height",
    type: "number",
    title: "What is your height in cm?",
    min: 100,
    max: 250,
    placeholder: "175",
  },
  {
    id: "q12-weight",
    type: "number",
    title: "What is your weight in kg?",
    min: 30,
    max: 300,
    placeholder: "80",
  },
  {
    id: "q13-duration",
    type: "single-choice",
    title: "How long have you had difficulty getting or maintaining an erection?",
    options: [
      { id: "lt1m", label: "Less than 1 month" },
      { id: "1-6m", label: "1–6 months" },
      { id: "6-12m", label: "6–12 months" },
      { id: "gt1y", label: "More than 1 year" },
    ],
  },
  {
    id: "q14-medical-history",
    type: "textarea",
    title: "Please provide any relevant medical history.",
    placeholder: "Type your answer here",
  },
  {
    id: "q15-doctor-treatment-history",
    type: "yes-no",
    title: "Have you ever been treated by a doctor for erectile dysfunction?",
  },
];
