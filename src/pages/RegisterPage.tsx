import { useState } from "react";
import { ContinueCtaButton } from "../components/ContinueCtaButton";
import { useFlowNav } from "../flow/useFlowNav";
import shared from "./shared.module.css";

export function RegisterPage() {
  const { goNext } = useFlowNav();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const valid = email.includes("@") && password.length >= 6;

  return (
    <div>
      <h1 className={shared.pageTitle}>Konto erstellen</h1>
      <p className={shared.pageSubtitle}>Registrieren Sie sich, um fortzufahren.</p>

      <div className={shared.field}>
        <label className={shared.label} htmlFor="email">
          E-Mail
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={shared.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={shared.field}>
        <label className={shared.label} htmlFor="password">
          Passwort
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          className={shared.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <ContinueCtaButton label="Weiter" disabled={!valid} onClick={goNext} />
    </div>
  );
}
