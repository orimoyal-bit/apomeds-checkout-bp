import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { FlowProvider } from "./flow/FlowContext";
import { QUESTIONS } from "./flow/questions";
import { FlowShell } from "./layout/FlowShell";
import { DeliveryPage } from "./pages/DeliveryPage";
import { DevPage } from "./pages/DevPage";
import { PaymentPage } from "./pages/PaymentPage";
import { ProductPage } from "./pages/ProductPage";
import { QuestionPage } from "./pages/QuestionPage";
import { RegisterPage } from "./pages/RegisterPage";
import { WelcomePage } from "./pages/WelcomePage";

export default function App() {
  return (
    <FlowProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<FlowShell />}>
            <Route index element={<WelcomePage />} />
            {QUESTIONS.map((q) => (
              <Route key={q.id} path={`questions/${q.id}`} element={<QuestionPage />} />
            ))}
            <Route path="register" element={<RegisterPage />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="delivery" element={<DeliveryPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="dev" element={<DevPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FlowProvider>
  );
}
