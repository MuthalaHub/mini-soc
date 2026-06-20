// src/App.tsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./constants/Theme";
import Layout from "./components/Layout";
import LandingPage from "./pages/Landingpage";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {/* Redirect bare root to the landing page */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<LandingPage />} />

            {/* Role consoles — one per SOC actor 
            <Route path="/analyst" element={<AnalystConsole />} />
            <Route path="/investigator" element={<InvestigatorConsole />} />
            <Route path="/operator" element={<OperatorConsole />} />
            */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}