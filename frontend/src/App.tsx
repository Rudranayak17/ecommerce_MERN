import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/"   element={<Home />} />
      <Route path="/login"   element={<Login />} />
      <Route path="/register"   element={<Register />} />

    </Routes>
      <Toaster />
    </>
  );
}

export default App;
