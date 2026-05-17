export type QuestionType =
  | "yes-no"
  | "single-choice"
  | "multi-choice"
  | "text"
  | "number"
  | "scale"
  | "date"
  | "textarea"
  | "checkbox"
  | "cards";

export type QuestionOption = {
  id: string;
  label: string;
};

export type QuestionStep = {
  id: string;
  type: QuestionType;
  title: string;
  subtitle?: string;
  options?: QuestionOption[];
  placeholder?: string;
  min?: number;
  max?: number;
  required?: boolean;
};

export type FlowStep =
  | { kind: "welcome"; path: "/"; label: "Welcome" }
  | { kind: "question"; path: string; label: string; questionId: string }
  | { kind: "register"; path: "/register"; label: "Sign up" }
  | { kind: "product"; path: "/product"; label: "Product" }
  | { kind: "delivery"; path: "/delivery"; label: "Delivery" }
  | { kind: "payment"; path: "/payment"; label: "Payment" }
  | { kind: "dev"; path: "/dev"; label: string };

export type FlowAnswers = Record<string, string | string[] | number | boolean>;

export type FeatureFlags = {
  skipQuestions: boolean;
  mockPayment: boolean;
  showStepDebug: boolean;
  fastCheckout: boolean;
};
