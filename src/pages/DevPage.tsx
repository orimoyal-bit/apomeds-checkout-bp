import { Link } from "react-router-dom";
import { useFlow } from "../flow/FlowContext";
import { FLOW_STEPS } from "../flow/steps";
import shared from "./shared.module.css";

export function DevPage() {
  const { flags, setFlag, resetFlow, answers } = useFlow();

  return (
    <div>
      <h1 className={shared.pageTitle}>Dev tools</h1>
      <p className={shared.pageSubtitle}>Feature flags & jump to any step (iPhone testing).</p>

      <FlagToggle
        label="Skip all questions (welcome → register)"
        checked={flags.skipQuestions}
        onChange={(v) => setFlag("skipQuestions", v)}
      />
      <FlagToggle
        label="Fast checkout (questions → register)"
        checked={flags.fastCheckout}
        onChange={(v) => setFlag("fastCheckout", v)}
      />
      <FlagToggle
        label="Mock payment"
        checked={flags.mockPayment}
        onChange={(v) => setFlag("mockPayment", v)}
      />
      <FlagToggle
        label="Show step debug path"
        checked={flags.showStepDebug}
        onChange={(v) => setFlag("showStepDebug", v)}
      />

      <button type="button" className={shared.continueBtn} onClick={resetFlow}>
        Reset all answers
      </button>

      <h2 style={{ fontSize: 16, marginTop: 24 }}>Jump to step</h2>
      <ul className={shared.optionList}>
        {FLOW_STEPS.filter((s) => s.kind !== "dev").map((step) => (
          <li key={step.path}>
            <Link to={step.path} className={shared.optionBtn} style={{ display: "block" }}>
              {step.label} — {step.path}
            </Link>
          </li>
        ))}
      </ul>

      <div className={shared.summaryBox}>
        Answers: {Object.keys(answers).length}
      </div>
    </div>
  );
}

function FlagToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 12,
        fontSize: 14,
      }}
    >
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}
