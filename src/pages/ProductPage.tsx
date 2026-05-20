import { useState } from "react";
import { ContinueCtaButton } from "../components/ContinueCtaButton";
import { useFlowNav } from "../flow/useFlowNav";
import shared from "./shared.module.css";

const PRODUCTS = [
  { id: "sildenafil-50", label: "Sildenafil 50 mg", price: "€29,90" },
  { id: "sildenafil-100", label: "Sildenafil 100 mg", price: "€39,90" },
  { id: "tadalafil-20", label: "Tadalafil 20 mg", price: "€34,90" },
];

export function ProductPage() {
  const { goNext } = useFlowNav();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <h1 className={shared.pageTitle}>Produkt wählen</h1>
      <p className={shared.pageSubtitle}>Wählen Sie Ihre Behandlung (Testdaten).</p>

      <ul className={shared.optionList}>
        {PRODUCTS.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              className={[
                shared.cardOption,
                selected === p.id ? shared.cardOptionSelected : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setSelected(p.id)}
            >
              {p.label}
              <br />
              <span style={{ fontWeight: 400, opacity: 0.7 }}>{p.price}</span>
            </button>
          </li>
        ))}
      </ul>

      <ContinueCtaButton label="Weiter" disabled={!selected} onClick={goNext} />
    </div>
  );
}
