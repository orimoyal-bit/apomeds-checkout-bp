import { CheckoutHeroContent } from "../components/CheckoutHeroContent";
import { useFlowNav } from "../flow/useFlowNav";
import styles from "./WelcomePage.module.css";

export function WelcomePage() {
  const { goNext } = useFlowNav();

  return (
    <div className={styles.welcome}>
      <CheckoutHeroContent
        onPrimaryClick={goNext}
        onSecondaryClick={() => alert("Prescription flow — hook up later")}
      />
    </div>
  );
}
