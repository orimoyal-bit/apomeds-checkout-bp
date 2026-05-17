import styles from "./CheckoutHeroContent.module.css";

/** Figma: Checkout / Hero Content (12210:26671) */
export type CheckoutHeroContentProps = {
  title?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string | null;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
};

const HERO_ILLUSTRATION_SRC =
  "https://www.figma.com/api/mcp/asset/754f1f11-74e8-4718-9dbf-45b2923da7f4";

export function CheckoutHeroContent({
  title = "You're In Good Hands",
  primaryCtaLabel = "Start online consultation",
  secondaryCtaLabel = null,
  onPrimaryClick,
  onSecondaryClick,
  className,
}: CheckoutHeroContentProps) {
  return (
    <section
      className={[styles.hero, className].filter(Boolean).join(" ")}
      aria-labelledby="checkout-hero-title"
    >
      <div className={styles.illustrationWrap}>
        <img
          className={styles.illustration}
          src={HERO_ILLUSTRATION_SRC}
          alt=""
          width={176}
          height={244}
        />
      </div>

      <h1 id="checkout-hero-title" className={styles.title}>
        {title}
      </h1>

      <p className={styles.description}>
        The medical service is operated by{" "}
        <strong className={styles.healthBrand}>Health&amp;go</strong>.{" "}
        <a href="#arzt" className={styles.descriptionLink}>
          UK-licensed
        </a>{" "}
        doctors will review your medical information. To ensure the best possible care,
        please answer the following questions truthfully.
      </p>

      <div className={styles.actions}>
        <button type="button" className={styles.primaryBtn} onClick={onPrimaryClick}>
          {primaryCtaLabel}
        </button>
        {secondaryCtaLabel && (
          <button type="button" className={styles.secondaryBtn} onClick={onSecondaryClick}>
            {secondaryCtaLabel}
          </button>
        )}
      </div>
    </section>
  );
}
