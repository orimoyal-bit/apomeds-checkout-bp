import styles from "./CheckoutHeader.module.css";

/** Figma: Checkout / Header (12209:26659) */
export type CheckoutHeaderProps = {
  rating?: string;
  className?: string;
};

const LOGO_SRC =
  "https://www.figma.com/api/mcp/asset/01648354-5fee-40d5-9310-084856189a27";
const TRUSTED_ICON_SRC =
  "https://www.figma.com/api/mcp/asset/31bfe684-5c22-4566-9781-bf0440731f49";
const STAR_SRC =
  "https://www.figma.com/api/mcp/asset/5a6d82ce-ab82-43bc-884b-43e08321e680";

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
