import { useState } from "react";
import { ContinueCtaButton } from "../components/ContinueCtaButton";
import { useFlowNav } from "../flow/useFlowNav";
import shared from "./shared.module.css";

export function DeliveryPage() {
  const { goNext } = useFlowNav();
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  const valid = street.length > 2 && city.length > 1 && zip.length >= 4;

  return (
    <div>
      <h1 className={shared.pageTitle}>Lieferadresse</h1>
      <p className={shared.pageSubtitle}>Wohin sollen wir liefern?</p>

      <div className={shared.field}>
        <label className={shared.label} htmlFor="street">
          Straße & Hausnummer
        </label>
        <input
          id="street"
          className={shared.input}
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </div>
      <div className={shared.field}>
        <label className={shared.label} htmlFor="zip">
          PLZ
        </label>
        <input id="zip" className={shared.input} value={zip} onChange={(e) => setZip(e.target.value)} />
      </div>
      <div className={shared.field}>
        <label className={shared.label} htmlFor="city">
          Stadt
        </label>
        <input
          id="city"
          className={shared.input}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <ContinueCtaButton
        label="Weiter zur Zahlung"
        disabled={!valid}
        onClick={goNext}
      />
    </div>
  );
}
