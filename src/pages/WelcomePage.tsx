import { CheckoutHeroContent } from "../components/CheckoutHeroContent";
import { QUESTIONS } from "../flow/questions";
import styles from "./WelcomePage.module.css";
import { useNavigate } from "react-router-dom";

export function WelcomePage() {
  const navigate = useNavigate();
  const firstQuestionPath = `/questions/${QUESTIONS[0].id}`;

  return (
    <div className={styles.welcome}>
      <CheckoutHeroContent
        onPrimaryClick={() => navigate(firstQuestionPath)}
        onSecondaryClick={() => alert("Prescription flow — hook up later")}
      />
    </div>
  );
}
