import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/Auth/Login";
import RegisterPage from "../pages/Auth/Register/RegisterPage";
import MapPage from "../pages/MapPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MapPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}