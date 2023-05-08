import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/Create";
import Logout from "./auth/Logout";
import { ProtectedRoutes } from "./auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path={"/"} element={<Home />} />
        <Route path={"/create"} element={<Create />} />
        <Route path={"/search"} element={<Search />} />
        <Route path={"/logout"} element={<Logout />} />
      </Route>
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
    </Routes>
  );
}

export default App;
