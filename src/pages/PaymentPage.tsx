import { ContinueCtaButton } from "../components/ContinueCtaButton";
import { useFlow } from "../flow/FlowContext";
import shared from "./shared.module.css";

export function PaymentPage() {
  const { flags, answers } = useFlow();

  return (
    <div>
      <h1 className={shared.pageTitle}>Zahlung</h1>
      <p className={shared.pageSubtitle}>
        {flags.mockPayment ?
          "Testmodus — keine echte Zahlung."
        : "Zahlungsmethode wählen."}
      </p>

      <button type="button" className={shared.optionBtn} style={{ marginBottom: 8 }}>
        Kreditkarte (Mock)
      </button>
      <button type="button" className={shared.optionBtn}>
        PayPal (Mock)
      </button>

      <ContinueCtaButton
        label={flags.mockPayment ? "Testzahlung abschließen" : "Bezahlen"}
        onClick={() => alert(flags.mockPayment ? "Mock payment OK ✓" : "Connect payment provider")}
      />

      <div className={shared.summaryBox}>
        <strong>Session answers</strong> ({Object.keys(answers).length} saved)
        <pre style={{ margin: "8px 0 0", whiteSpace: "pre-wrap", fontSize: 11 }}>
          {JSON.stringify(answers, null, 2)}
        </pre>
      </div>
    </div>
  );
}
