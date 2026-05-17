import { QUESTIONS } from "./questions";
import type { FlowAnswers, FlowStep, QuestionStep } from "./types";

const questionSteps: FlowStep[] = QUESTIONS.map((q, i) => ({
  kind: "question" as const,
  path: `/questions/${q.id}`,
  label: `Q${i + 1}`,
  questionId: q.id,
}));

export const FLOW_STEPS: FlowStep[] = [
  { kind: "welcome", path: "/", label: "Welcome" },
  ...questionSteps,
  { kind: "register", path: "/register", label: "Sign up" },
  { kind: "product", path: "/product", label: "Product" },
  { kind: "delivery", path: "/delivery", label: "Delivery" },
  { kind: "payment", path: "/payment", label: "Payment" },
  { kind: "dev", path: "/dev", label: "Dev tools" },
];

function isQuestionVisible(question: QuestionStep, answers: FlowAnswers): boolean {
  if (!question.showIf) return true;
  return answers[question.showIf.questionId] === question.showIf.value;
}

export function getVisibleSteps(answers: FlowAnswers = {}): FlowStep[] {
  return FLOW_STEPS.filter((step) => {
    if (step.kind !== "question") return true;
    const question = QUESTIONS.find((q) => q.id === step.questionId);
    return question ? isQuestionVisible(question, answers) : true;
  });
}

export function getStepIndex(pathname: string, answers: FlowAnswers = {}): number {
  const normalized =
    pathname.startsWith("/questions/") ?
      pathname
    : pathname === "/" ? "/"
    : pathname.replace(/\/$/, "");
  const idx = getVisibleSteps(answers).findIndex((s) => s.path === normalized);
  return idx >= 0 ? idx : 0;
}

export function getNextPath(pathname: string, answers: FlowAnswers = {}): string | null {
  const steps = getVisibleSteps(answers);
  const idx = getStepIndex(pathname, answers);
  if (idx < 0 || idx >= steps.length - 1) return null;
  const next = steps[idx + 1];
  if (next.kind === "dev") return null;
  return next.path;
}

export function getPrevPath(pathname: string, answers: FlowAnswers = {}): string | null {
  const steps = getVisibleSteps(answers);
  const idx = getStepIndex(pathname, answers);
  if (idx <= 0) return null;
  return steps[idx - 1].path;
}

export const PROGRESS_STEPS = FLOW_STEPS.filter((s) => s.kind !== "dev");
