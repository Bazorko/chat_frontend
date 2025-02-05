import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/ReuireAuth.tsx";
import Layout from "./components/Layout.tsx";
import Home from "./Home.tsx";
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