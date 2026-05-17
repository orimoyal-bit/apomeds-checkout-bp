import type { QuestionStep } from "./types";

export const QUESTIONS: QuestionStep[] = [
  {
    id: "q1-erection-frequency",
    type: "single-choice",
    title: "How often do you have difficulty getting or maintaining an erection?",
    options: [
      { id: "occasionally", label: "Occasionally" },
      { id: "regularly", label: "Regularly" },
      { id: "rarely", label: "Rarely" },
    ],
    required: true,
  },
  {
    id: "q2-sex-at-birth",
    type: "single-choice",
    title: "What sex were you assigned at birth?",
    infoText: "You can only place an order for yourself and not on behalf of another person.",
    blockingOptionId: "female",
    blockingError: "We are sorry but this product can not be issued for the chosen gender.",
    options: [
      { id: "male", label: "Male" },
      { id: "female", label: "Female" },
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
    id: "q3-previous-medication-name",
    type: "text",
    title: "Name of the medication",
    subtitle: "Type here to search.",
    placeholder: "Can't find your medicine?",
    showIf: { questionId: "q3-ed-medication-history", value: "yes" },
    required: true,
  },
  {
    id: "q4-contraindications",
    type: "yes-no",
    title:
      "Do you have any of the medical conditions listed below, or are you taking any of the following medications?",
    subtitle:
      "Angina treated with daily nitrate medication, stroke or heart attack within the last 6 months, low blood pressure (<90/50 mmHg), untreated or uncontrolled high blood pressure, liver disease, penile abnormalities, ischaemic retinopathy, alcohol and/or drug misuse, amyl nitrite (“poppers”), or Riociguat (Adempas).",
    infoText:
      "Warning: Combining erectile dysfunction medicines with nitrate medications or medicines that affect heart rate can cause life-threatening reactions. Please answer this question honestly.",
    blockingOptionId: "yes",
    blockingError: "We are very sorry, but we cannot prescribe this medication for you. Please contact your doctor.",
    required: true,
  },
  {
    id: "q5-medical-history",
    type: "multi-choice",
    title:
      "Have you been diagnosed with any of the following conditions, or are you taking any of the following medications?",
    infoText:
      "Combining erectile dysfunction medications with alpha blockers (e.g. alfuzosin, doxazosin, terazosin, prazosin, urapidil) can lead to life-threatening reactions. Therefore, these medications must not be taken together.",
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
    id: "q6-other-medications",
    type: "yes-no",
    title: "Are you currently taking any other medications?",
    required: true,
  },
  {
    id: "q6-other-medications-details",
    type: "textarea",
    title: "Tell us about your medication.",
    subtitle: "More than one medication? Add each medication on a new line.",
    placeholder: "Name of the medication, dosage (e.g. 25 mg), and how often you take it",
    showIf: { questionId: "q6-other-medications", value: "yes" },
    required: true,
  },
  {
    id: "q7-allergies",
    type: "yes-no",
    title: "Are you allergic to any substances, medications, or foods?",
    required: true,
  },
  {
    id: "q7-allergies-details",
    type: "textarea",
    title: "Please list all substances you are allergic to.",
    placeholder: "Please add any additional information here.",
    showIf: { questionId: "q7-allergies", value: "yes" },
    required: true,
  },
  {
    id: "q8-additional-information-choice",
    type: "yes-no",
    title: "Would you like to provide the doctor with any additional information?",
    required: true,
  },
  {
    id: "q8-additional-information",
    type: "textarea",
    title: "Please add any additional information here.",
    placeholder: "Type your answer here",
    showIf: { questionId: "q8-additional-information-choice", value: "yes" },
    required: true,
  },
  {
    id: "q9-gp-acknowledgement",
    type: "checkbox",
    title:
      "I understand that it is advisable to inform my GP about this treatment to help prevent potential negative effects on future treatments and/or health issues.",
    subtitle:
      "We can also inform your GP on your behalf. If you would like us to do so, please email your GP’s contact details to support@healthandgo.com.",
    options: [{ id: "acknowledge", label: "I understand" }],
    required: true,
  },
  {
    id: "q10-consent",
    type: "checkbox",
    title: "By clicking “Next”, you confirm the following:",
    bullets: [
      "I confirm that I have answered all questions truthfully and to the best of my knowledge.",
      "I understand that providing false information may be harmful to my health.",
      "I understand that the diagnosis and treatment are for my personal use only.",
      "I confirm that I will not take additional erectile dysfunction medicines alongside the medication prescribed to me.",
      "If a medical treatment is prescribed, I confirm that I will carefully read the patient information leaflet and will not exceed the recommended daily dose.",
      "I understand that smoking and alcohol consumption may affect the effectiveness of the medication.",
      "I understand that all prescriptions are private and are not covered by health insurance.",
      "I understand that my medical details and prescription are valid for 12 months from the date they are issued, and I will report any health changes immediately.",
      "I accept the Terms and Conditions and Privacy Policy of Health&Go.",
    ],
    infoText: "When you click Next, the completed questionnaire will be forwarded to the attending physician.",
    options: [{ id: "confirm", label: "I confirm and agree" }],
    required: true,
  },
];
