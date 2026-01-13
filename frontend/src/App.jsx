import { useState } from "react";
import { AuthProvider, useAuth } from "./context/auth-context";
import Login from "./pages/login";
import Register from "./pages/register";
import Gigs from "./pages/gigs";
import Navbar from "./components/navbar";

function Content() {
  const { user } = useAuth();
  const [mode, setMode] = useState("login");

  if (user) return <Gigs />;

  return mode === "login" ? (
    <Login switchMode={() => setMode("register")} />
  ) : (
    <Register switchMode={() => setMode("login")} />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Content />
    </AuthProvider>
  );
}
