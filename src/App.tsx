import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { FlowProvider } from "./flow/FlowContext";
import { FlowShell } from "./layout/FlowShell";
import { DeliveryPage } from "./pages/DeliveryPage";
import { DevPage } from "./pages/DevPage";
import { PaymentPage } from "./pages/PaymentPage";
import { ProductPage } from "./pages/ProductPage";
import { QuestionPage } from "./pages/QuestionPage";
import { RegisterPage } from "./pages/RegisterPage";
import { WelcomePage } from "./pages/WelcomePage";

export default function App() {
  const [hashKey, setHashKey] = useState(() => window.location.hash || "#/");

  useEffect(() => {
    const syncHash = () => setHashKey(window.location.hash || "#/");
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);

  return (
    <FlowProvider>
      <HashRouter key={hashKey}>
        <Routes>
          <Route element={<FlowShell />}>
            <Route index element={<WelcomePage />} />
            <Route path="questions/:questionId" element={<QuestionPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="delivery" element={<DeliveryPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="dev" element={<DevPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </FlowProvider>
  );
}
