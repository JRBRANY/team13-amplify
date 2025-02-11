import { useAuth } from "react-oidc-context";
import { useState } from "react";
import Home from './pages/Home';
import About from './pages/About';
import Driver from './pages/Driver';
import Sponsor from './pages/Sponsor';
import Admin from './pages/Admin';
import DriverDashboard from './dashboards/DriverDashboard';
import SponsorDashboard from './dashboards/SponsorDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

function App() {
  const auth = useAuth();
  const [currentPage, setCurrentPage] = useState("home"); // Track active page

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {

    /* Obtain the group the user is assigned to in Cognito */
    const cognitoGroups: string[] = auth.user?.profile?.["cognito:groups"] as string[] || [];
    const userGroup = cognitoGroups[0];

    switch (userGroup) {
      case "Driver":
        return <DriverDashboard />;
      case "Sponsor":
        return <SponsorDashboard />;
      case "Admin":
        return <AdminDashboard />;
      default:
        return <div>Access Denied</div>;
    }
  }

  return (
    <div>
      {/* Navbar with buttons for navigation */}
      <header className="navbar">
        <nav className="nav-links">
          <button onClick={() => setCurrentPage("home")}>Home</button> |{" "}
          <button onClick={() => setCurrentPage("about")}>About</button> |{" "}
          <button onClick={() => setCurrentPage("driver")}>Driver</button> |{" "}
          <button onClick={() => setCurrentPage("sponsor")}>Sponsor</button> |{" "}
          <button onClick={() => setCurrentPage("admin")}>Admin</button>

        </nav>
      </header>

      {/* Render the selected page */}
      <main>
        {currentPage === "home" && <Home />}
        {currentPage === "about" && <About />}
        {currentPage === "driver" && <Driver />}
        {currentPage === "sponsor" && <Sponsor />}
        {currentPage === "admin" && <Admin />}
      </main>
    </div>
  );
}

export default App;
