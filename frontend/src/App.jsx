import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/auth-context";
import Navbar from "./components/navbar";
import PublicGigs from "./pages/public-gigs";
import MyGigs from "./pages/my-gigs";
import MyBids from "./pages/my-bids";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<PublicGigs />} />
          <Route
            path="/my-gigs"
            element={
              <PrivateRoute>
                <MyGigs />
              </PrivateRoute>
            }
          />

          <Route
            path="/my-bids"
            element={
              <PrivateRoute>
                <MyBids />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
