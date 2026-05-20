import styles from "./ContinueCtaButton.module.css";

type ContinueCtaButtonProps = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  /** Default true — matches consultation NEXT CTA */
  showArrow?: boolean;
  className?: string;
};

export function ContinueCtaButton({
  label,
  disabled,
  onClick,
  showArrow = true,
  className,
}: ContinueCtaButtonProps) {
  return (
    <button
      type="button"
      className={
        [styles.root, showArrow ? styles.rootWithArrow : "", className].filter(Boolean).join(" ")
      }
      disabled={disabled}
      onClick={onClick}
    >
      <span className={styles.label}>{label}</span>
      {showArrow && (
        <span className={styles.arrow} aria-hidden="true">
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 8h12M14 3l6 5-6 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </button>
  );
}
