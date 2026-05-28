import styles from "./ConsultationHeader.module.css";
import apomedsLogo from "../assets/apomeds-logo.svg";

type ConsultationHeaderProps = {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
};

const LOGO_SRC = apomedsLogo;

export function ConsultationHeader({
  currentStep,
  totalSteps,
  onBack,
}: ConsultationHeaderProps) {
  const activeStep = Math.max(1, Math.min(currentStep, totalSteps));

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        {onBack && (
          <button type="button" className={styles.backButton} onClick={onBack} aria-label="Go back">
            <span aria-hidden="true">‹</span>
          </button>
        )}
        <div className={styles.logoFrame}>
          <img className={styles.logo} src={LOGO_SRC} alt="Apomeds" />
        </div>
      </div>

      <div className={styles.progress} aria-label={`Consultation step ${activeStep} of ${totalSteps}`}>
        <div className={styles.progressSegments}>
          {Array.from({ length: totalSteps }, (_, index) => (
            <span
              key={index}
              className={[
                styles.segment,
                index < activeStep ? styles.segmentActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
            />
          ))}
        </div>
        <p className={styles.progressLabel}>Consultation</p>
      </div>
    </header>
  );
}
