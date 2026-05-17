import { useLocation, useNavigate } from "react-router-dom";
import { getNextPath, getPrevPath } from "./steps";
import { useFlow } from "./FlowContext";
import type { FlowAnswers } from "./types";

export function useFlowNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { answers, flags } = useFlow();

  const goNext = (nextAnswers?: FlowAnswers | unknown) => {
    const answersForNavigation =
      nextAnswers && typeof nextAnswers === "object" && !("nativeEvent" in nextAnswers) ?
        (nextAnswers as FlowAnswers)
      : answers;

    if (flags.fastCheckout && pathname.startsWith("/questions/")) {
      navigate("/register");
      return;
    }
    if (flags.skipQuestions && pathname === "/") {
      navigate("/register");
      return;
    }
    const next = getNextPath(pathname, answersForNavigation);
    if (next) navigate(next);
  };

  const goBack = () => {
    const prev = getPrevPath(pathname, answers);
    if (prev) navigate(prev);
  };

  return { goNext, goBack, pathname };
}
