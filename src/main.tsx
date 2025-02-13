import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/UserAuth.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />}/>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
