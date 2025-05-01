import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./utils/auth/RequireAuth.tsx";
import Layout from "./utils/ui-containers/Layout.tsx";
import PublicRoutes from "./utils/auth/PublicRoutes.tsx";
import Home from "./pages/Home.tsx";
import LazyLoadedPages from "./pages/LazyLoadedPages.tsx";

const ChatComponent = lazy(() => import("./pages/Chat.tsx"));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PublicRoutes/>}>
          <Route path="/" element={<Home />}/>
        </Route>

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="chat" element={
            <LazyLoadedPages>
              <ChatComponent/>
            </LazyLoadedPages>
          }/>
        </Route>
      </Route>
    </Routes>
  )
}

export default App;