import type { QuestionStep } from "./types";

/** 15 question prototypes — mix types for UX / logic testing */
export const QUESTIONS: QuestionStep[] = [
  {
    id: "q1-consent",
    type: "checkbox",
    title: "Einwilligung",
    subtitle: "Ich bestätige, dass ich mindestens 18 Jahre alt bin.",
    options: [{ id: "age", label: "Ja, ich bin 18 oder älter" }],
    required: true,
  },
  {
    id: "q2-symptoms",
    type: "yes-no",
    title: "Haben Sie aktuell Beschwerden?",
    subtitle: "Z. B. Brustschmerzen, Schwindel oder Atemnot.",
  },
  {
    id: "q3-condition",
    type: "single-choice",
    title: "Wofür möchten Sie behandelt werden?",
    options: [
      { id: "ed", label: "Erektionsstörung" },
      { id: "pe", label: "Vorzeitiger Samenerguss" },
      { id: "other", label: "Anderes" },
    ],
  },
  {
    id: "q4-medications",
    type: "multi-choice",
    title: "Nehmen Sie regelmäßig Medikamente ein?",
    options: [
      { id: "none", label: "Keine" },
      { id: "heart", label: "Herz / Blutdruck" },
      { id: "diabetes", label: "Diabetes" },
      { id: "other", label: "Andere" },
    ],
  },
  {
    id: "q5-allergies",
    type: "text",
    title: "Haben Sie Allergien?",
    placeholder: "z. B. Penicillin — oder „keine“",
  },
  {
    id: "q6-height",
    type: "number",
    title: "Körpergröße (cm)",
    min: 100,
    max: 250,
    placeholder: "175",
  },
  {
    id: "q7-weight",
    type: "number",
    title: "Gewicht (kg)",
    min: 30,
    max: 300,
    placeholder: "80",
  },
  {
    id: "q8-frequency",
    type: "scale",
    title: "Wie oft tritt das Problem auf?",
    subtitle: "1 = selten, 5 = sehr häufig",
    min: 1,
    max: 5,
  },
  {
    id: "q9-duration",
    type: "single-choice",
    title: "Seit wann besteht das Problem?",
    options: [
      { id: "lt1m", label: "Weniger als 1 Monat" },
      { id: "1-6m", label: "1–6 Monate" },
      { id: "6-12m", label: "6–12 Monate" },
      { id: "gt1y", label: "Länger als 1 Jahr" },
    ],
  },
  {
    id: "q10-history",
    type: "textarea",
    title: "Relevante Vorerkrankungen",
    placeholder: "Optional — kurz beschreiben",
  },
  {
    id: "q11-doctor",
    type: "yes-no",
    title: "Wurden Sie schon einmal wegen dieses Problems behandelt?",
  },
  {
    id: "q12-preference",
    type: "cards",
    title: "Bevorzugte Behandlungsform",
    options: [
      { id: "tablet", label: "Tablette vor Bedarf" },
      { id: "daily", label: "Tägliche Dosis" },
      { id: "unsure", label: "Weiß ich noch nicht" },
    ],
  },
  {
    id: "q13-lifestyle",
    type: "multi-choice",
    title: "Lebensstil (Mehrfachauswahl)",
    options: [
      { id: "smoke", label: "Raucher" },
      { id: "alcohol", label: "Alkohol regelmäßig" },
      { id: "sport", label: "Sport regelmäßig" },
      { id: "stress", label: "Hoher Stress" },
    ],
  },
  {
    id: "q14-start",
    type: "date",
    title: "Ab wann möchten Sie starten?",
  },
  {
    id: "q15-notes",
    type: "text",
    title: "Noch etwas für den Arzt?",
    placeholder: "Optional",
  },
];
