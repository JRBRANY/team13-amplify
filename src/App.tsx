import { useAuth } from "react-oidc-context";
import { useState } from "react";
import Home from './pages/Home';
import About from './pages/About';
import Driver from './pages/Driver';
import Sponsor from './pages/Sponsor';

function App() {
  const auth = useAuth();
  const [currentPage, setCurrentPage] = useState("home"); // Track active page

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
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {

    /* Obtain the group the user is assigned to in Cognito */
    const cognitoGroups: string[] = auth.user?.profile?.["cognito:groups"] as string[] || [];

    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>
        <pre> Group: {cognitoGroups[0]} </pre>
        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      {/* Navbar with buttons for navigation */}
      <header className="navbar">
        <nav className="nav-links">
          <button onClick={() => setCurrentPage("home")}>Home</button> |{" "}
          <button onClick={() => setCurrentPage("about")}>About</button> |{" "}
          <button onClick={() => setCurrentPage("driver")}>Driver</button> |{" "}
          <button onClick={() => setCurrentPage("sponsor")}>Sponsor</button>

          {/* Sign-in / Sign-out buttons next to links */}
          <div className="auth-buttons">
            <button onClick={() => auth.signinRedirect()}>Sign in</button>
            <button onClick={() => signOutRedirect()}>Sign out</button>
          </div>
        </nav>
      </header>

      {/* Render the selected page */}
      <main>
        {currentPage === "home" && <Home />}
        {currentPage === "about" && <About />}
        {currentPage === "driver" && <Driver />}
        {currentPage === "sponsor" && <Sponsor />}
      </main>
    </div>
  );
}

export default App;
