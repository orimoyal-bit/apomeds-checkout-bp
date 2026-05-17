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

export type AnswerValue = string | string[] | number | boolean;

export type QuestionStep = {
  id: string;
  type: QuestionType;
  title: string;
  subtitle?: string;
  bullets?: string[];
  bulletVariant?: "boxed" | "plain";
  infoText?: string;
  blockingOptionId?: string;
  blockingError?: string;
  blockingErrorVariant?: "with-icon" | "plain";
  optionLayout?: "vertical" | "horizontal";
  showIf?: {
    questionId: string;
    value: string | boolean;
  };
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

export type FlowAnswers = Record<string, AnswerValue>;

export type FeatureFlags = {
  skipQuestions: boolean;
  mockPayment: boolean;
  showStepDebug: boolean;
  fastCheckout: boolean;
};
