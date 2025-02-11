import { useAuth } from "react-oidc-context";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Success from "./pages/AccountCreated";
import DriverDashboard from "./dashboards/DriverDashboard";
import SponsorDashboard from "./dashboards/SponsorDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "r7oq53d98cg6a8l4cj6o8l7tm";
    const logoutUri = "https://main.d1zgxgaa1s4k42.amplifyapp.com/";
    const cognitoDomain = "https://us-east-1jnojoftl2.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    // Get Cognito Group
    const cognitoGroups: string[] = auth.user?.profile?.["cognito:groups"] as string[] || [];
    const userGroup = cognitoGroups[0]?.toLowerCase(); // Ensure case consistency

    // Route user to correct dashboard
    switch (userGroup) {
      case "driver":
        return <DriverDashboard />;
      case "sponsor":
        return <SponsorDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <div>Access Denied</div>;
    }
  }

  return (
    <Router>
      <header className="navbar">
        <nav className="nav-links">
          <button onClick={() => (window.location.href = "/")}>Home</button> |{" "}
          <button onClick={() => (window.location.href = "/about")}>About</button>

          <div className="auth-buttons">
            <button onClick={() => auth.signinRedirect()}>Sign in</button>
            <button onClick={() => signOutRedirect()}>Sign out</button>
          </div>
        </nav>
      </header>

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/success" element={auth.isAuthenticated ? <Success /> : <Navigate to="/" />} />

        {/* Protected Routes (Require Authentication) */}
        {auth.isAuthenticated && (
          <>
            <Route path="/driver-dashboard" element={<DriverDashboard />} />
            <Route path="/sponsor-dashboard" element={<SponsorDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </>
        )}

        {/* Redirect to Home for Unknown Routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;