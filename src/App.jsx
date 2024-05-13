import "./App.css";
import Room from "./pages/Room";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import { AuthProvider } from "./utiles/AuthContext";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registerpage" element={<RegisterPage />} />
            <Route element={<PrivateRoutes />}>
              {" "}
              For routes if the user is logged in or like user= true
              <Route path="/" element={<Room />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
