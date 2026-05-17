import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ConsultationHeader } from "../components/ConsultationHeader";
import { CheckoutHeader } from "../components/CheckoutHeader";
import { useFlow } from "../flow/FlowContext";
import { getStepIndex, PROGRESS_STEPS } from "../flow/steps";
import { useFlowNav } from "../flow/useFlowNav";
import styles from "./FlowShell.module.css";

export function FlowShell() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { flags } = useFlow();
  const { goBack } = useFlowNav();

  const isWelcome = pathname === "/";
  const isDev = pathname === "/dev";
  const progressIndex = getStepIndex(pathname);
  const progressTotal = PROGRESS_STEPS.length - 1;

  return (
    <div className={[styles.shell, isWelcome ? styles.shellWelcome : ""].filter(Boolean).join(" ")}>
      {isWelcome || isDev ?
        <CheckoutHeader />
      : <ConsultationHeader
          currentStep={progressIndex}
          totalSteps={progressTotal}
          onBack={progressIndex > 1 ? goBack : undefined}
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
