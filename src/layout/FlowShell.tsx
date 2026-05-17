import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ConsultationHeader } from "../components/ConsultationHeader";
import { CheckoutHeader } from "../components/CheckoutHeader";
import { useFlow } from "../flow/FlowContext";
import { QUESTIONS } from "../flow/questions";
import { getStepIndex, getVisibleSteps } from "../flow/steps";
import styles from "./FlowShell.module.css";

export function FlowShell() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { answers, flags } = useFlow();

  const isWelcome = pathname === "/";
  const isDev = pathname === "/dev";
  const usesCreamBackground = isWelcome || pathname === `/questions/${QUESTIONS[0].id}`;
  const visibleProgressSteps = getVisibleSteps(answers).filter((s) => s.kind !== "dev");
  const progressIndex = getStepIndex(pathname, answers);
  const progressTotal = visibleProgressSteps.length - 1;

  useEffect(() => {
    document.body.style.background =
      usesCreamBackground ? "var(--color-bg-cream)" : "var(--color-bg-white)";

    return () => {
      document.body.style.background = "";
    };
  }, [usesCreamBackground]);

  return (
    <div
      className={[styles.shell, usesCreamBackground ? styles.shellWelcome : ""]
        .filter(Boolean)
        .join(" ")}
    >
      {isWelcome || isDev ?
        <CheckoutHeader />
      : <ConsultationHeader
          currentStep={progressIndex}
          totalSteps={progressTotal}
        />
      }
      {!isWelcome && !isDev && flags.showStepDebug && <p className={styles.debug}>{pathname}</p>}
      <main className={styles.body}>
        <Outlet />
      </main>
      <button
        type="button"
        className={styles.devFab}
        title="Dev tools"
        aria-label="Open dev tools"
        onClick={() => navigate("/dev")}
      >
        ⚙
      </button>
    </div>
  );
}
