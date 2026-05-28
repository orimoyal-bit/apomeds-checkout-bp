import styles from "./CheckoutHeader.module.css";
import apomedsLogo from "../assets/apomeds-logo.svg";
import trustedShield from "../assets/trusted-shield.svg";
import starIcon from "../assets/star.svg";

/** Figma: Checkout / Header (12209:26659) */
export type CheckoutHeaderProps = {
  rating?: string;
  className?: string;
};

const LOGO_SRC = apomedsLogo;
const TRUSTED_ICON_SRC = trustedShield;
const STAR_SRC = starIcon;

export function CheckoutHeader({
  rating = "4.8",
  className,
}: CheckoutHeaderProps) {
  return (
    <header className={[styles.header, className].filter(Boolean).join(" ")}>
      <div className={styles.top}>
        <div className={styles.logoWrap}>
          <img className={styles.logo} src={LOGO_SRC} alt="Apomeds" />
        </div>
        <div className={styles.trusted} aria-label={`Trusted Shops ${rating}`}>
          <img
            className={styles.trustedIcon}
            src={TRUSTED_ICON_SRC}
            alt=""
            width={27}
            height={27}
          />
          <span className={styles.rating}>{rating}</span>
          <img className={styles.star} src={STAR_SRC} alt="" width={24} height={24} />
        </div>
      </div>
    </header>
  );
}
