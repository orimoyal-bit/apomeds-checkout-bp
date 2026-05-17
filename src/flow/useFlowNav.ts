import { useLocation, useNavigate } from "react-router-dom";
import { getNextPath, getPrevPath } from "./steps";
import { useFlow } from "./FlowContext";

export function useFlowNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { flags } = useFlow();

  const goNext = () => {
    if (flags.fastCheckout && pathname.startsWith("/questions/")) {
      navigate("/register");
      return;
    }
    if (flags.skipQuestions && pathname === "/") {
      navigate("/register");
      return;
    }
    const next = getNextPath(pathname);
    if (next) navigate(next);
  };

  const goBack = () => {
    const prev = getPrevPath(pathname);
    if (prev) navigate(prev);
  };

  return { goNext, goBack, pathname };
}
