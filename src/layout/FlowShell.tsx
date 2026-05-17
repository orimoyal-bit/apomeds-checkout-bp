import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
  const progressPct = Math.round((progressIndex / progressTotal) * 100);

  return (
    <div className={styles.shell}>
      <CheckoutHeader />
      {!isWelcome && !isDev && (
        <div className={styles.progress}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className={styles.progressLabel}>
            Step {progressIndex + 1} of {PROGRESS_STEPS.length}
          </p>
          {flags.showStepDebug && <p className={styles.debug}>{pathname}</p>}
        </div>
      )}
      <main className={styles.body}>
        <Outlet />
      </main>
      {!isWelcome && !isDev && progressIndex > 0 && (
        <footer className={styles.footer}>
          <button type="button" className={styles.btnSecondary} onClick={goBack}>
            Zurück
          </button>
        </footer>
      )}
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
