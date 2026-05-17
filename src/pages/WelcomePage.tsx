import { CheckoutHeroContent } from "../components/CheckoutHeroContent";
import { QUESTIONS } from "../flow/questions";
import styles from "./WelcomePage.module.css";

export function WelcomePage() {
  const firstQuestionHref = `#/questions/${QUESTIONS[0].id}`;

  return (
    <div className={styles.welcome}>
      <CheckoutHeroContent
        primaryCtaHref={firstQuestionHref}
        onSecondaryClick={() => alert("Prescription flow — hook up later")}
      />
    </div>
  );
}
