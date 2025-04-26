import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/UserAuth.tsx";
import { DataProvider } from "./contexts/UserData.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <DataProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />}/>
          </Routes>
      </BrowserRouter>
    </DataProvider>
  </AuthProvider>,
)
