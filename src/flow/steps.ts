import { QUESTIONS } from "./questions";
import type { FlowStep } from "./types";

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

export function getStepIndex(pathname: string): number {
  const normalized =
    pathname.startsWith("/questions/") ?
      pathname
    : pathname === "/" ? "/"
    : pathname.replace(/\/$/, "");
  const idx = FLOW_STEPS.findIndex((s) => s.path === normalized);
  return idx >= 0 ? idx : 0;
}

export function getNextPath(pathname: string): string | null {
  const idx = getStepIndex(pathname);
  if (idx < 0 || idx >= FLOW_STEPS.length - 1) return null;
  const next = FLOW_STEPS[idx + 1];
  if (next.kind === "dev") return null;
  return next.path;
}

export function getPrevPath(pathname: string): string | null {
  const idx = getStepIndex(pathname);
  if (idx <= 0) return null;
  return FLOW_STEPS[idx - 1].path;
}

export const PROGRESS_STEPS = FLOW_STEPS.filter((s) => s.kind !== "dev");
