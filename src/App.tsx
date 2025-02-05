import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/utils/ReuireAuth.tsx";
import Layout from "./components/utils/Layout.tsx";
import Home from "./pages/Home.tsx";
import Chat from "./pages/Chat.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />}/>

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="chat" element={<Chat />}/>
        </Route>
      </Route>
    </Routes>
  )
}

export default App;