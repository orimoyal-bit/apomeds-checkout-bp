import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { FeatureFlags, FlowAnswers } from "./types";

const DEFAULT_FLAGS: FeatureFlags = {
  skipQuestions: false,
  mockPayment: true,
  showStepDebug: true,
  fastCheckout: false,
};

type FlowContextValue = {
  answers: FlowAnswers;
  setAnswer: (questionId: string, value: FlowAnswers[string]) => void;
  flags: FeatureFlags;
  setFlag: <K extends keyof FeatureFlags>(key: K, value: FeatureFlags[K]) => void;
  resetFlow: () => void;
};

const FlowContext = createContext<FlowContextValue | null>(null);

export function FlowProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<FlowAnswers>({});
  const [flags, setFlags] = useState<FeatureFlags>(() => {
    try {
      const raw = localStorage.getItem("flow-flags");
      return raw ? { ...DEFAULT_FLAGS, ...JSON.parse(raw) } : DEFAULT_FLAGS;
    } catch {
      return DEFAULT_FLAGS;
    }
  });

  const setAnswer = useCallback((questionId: string, value: FlowAnswers[string]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const setFlag = useCallback(<K extends keyof FeatureFlags>(key: K, value: FeatureFlags[K]) => {
    setFlags((prev) => {
      const next = { ...prev, [key]: value };
      localStorage.setItem("flow-flags", JSON.stringify(next));
      return next;
    });
  }, []);

  const resetFlow = useCallback(() => {
    setAnswers({});
    localStorage.removeItem("flow-answers");
  }, []);

  const value = useMemo(
    () => ({ answers, setAnswer, flags, setFlag, resetFlow }),
    [answers, setAnswer, flags, setFlag, resetFlow],
  );

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

export function useFlow() {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error("useFlow must be used within FlowProvider");
  return ctx;
}
