import { AuthProvider } from "./context/auth-context";
import Gigs from "./pages/gigs";
import Navbar from "./components/navbar";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Gigs />
    </AuthProvider>
  );
}
