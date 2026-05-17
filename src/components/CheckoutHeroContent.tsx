import styles from "./CheckoutHeroContent.module.css";

/** Figma: Checkout / Hero Content (12210:26671) */
export type CheckoutHeroContentProps = {
  title?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
};

const HERO_ILLUSTRATION_SRC =
  "https://www.figma.com/api/mcp/asset/754f1f11-74e8-4718-9dbf-45b2923da7f4";

export function CheckoutHeroContent({
  title = "Sie sind in guten Händen",
  primaryCtaLabel = "Jetzt starten",
  secondaryCtaLabel = "Ich habe bereits ein Rezept",
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
        Sie werden zu <strong>Health&amp;Go</strong> weitergeleitet, wo ein{" "}
        <a href="#arzt" className={styles.descriptionLink}>
          approbierter EU-Arzt
        </a>{" "}
        Ihre Angaben prüft. Bitte beantworten Sie die Fragen wahrheitsgemäß.
      </p>

      <div className={styles.actions}>
        <button type="button" className={styles.primaryBtn} onClick={onPrimaryClick}>
          {primaryCtaLabel}
        </button>
        <button type="button" className={styles.secondaryBtn} onClick={onSecondaryClick}>
          {secondaryCtaLabel}
        </button>
      </div>
    </section>
  );
}
