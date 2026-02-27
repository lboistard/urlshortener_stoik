import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AuthLoadingProvider } from "./contexts/AuthLoadingContext";

export default function Router() {
  return (
    <BrowserRouter>
      <AuthLoadingProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </AuthLoadingProvider>
    </BrowserRouter>
  );
}
