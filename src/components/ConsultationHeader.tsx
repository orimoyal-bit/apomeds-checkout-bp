import styles from "./ConsultationHeader.module.css";

type ConsultationHeaderProps = {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
};

const LOGO_SRC =
  "https://www.figma.com/api/mcp/asset/4487de1b-437c-423a-9c23-9ef519aa176f";

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
        <img className={styles.logo} src={LOGO_SRC} alt="Apomeds" />
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
