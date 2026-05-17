import { CheckoutHeader } from "./CheckoutHeader";
import { CheckoutHeroContent } from "./CheckoutHeroContent";
import styles from "./CheckoutBpPage.module.css";

/** Composed checkout landing — Figma Checkout / BP Preview (12211:26634) */
export function CheckoutBpPage() {
  return (
    <div className={styles.page}>
      <CheckoutHeader />
      <main className={styles.main}>
        <CheckoutHeroContent
          onPrimaryClick={() => console.log("Start consultation")}
          onSecondaryClick={() => console.log("Already have prescription")}
        />
      </main>
    </div>
  );
}
