import { useAuth } from "react-oidc-context";
import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Driver from './pages/Driver';
import Sponsor from './pages/Sponsor';

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
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      {/* Navbar with links and buttons in one flex container */}
      <header className="navbar">
        <nav className="nav-links">
          <Link to="/">Home</Link> |{" "}
          <Link to="/about">About</Link> |{" "}
          <Link to="/driver">Driver</Link> |{" "}
          <Link to="/sponsor">Sponsor</Link>
  
          {/* Sign-in / Sign-out buttons next to links */}
          <div className="auth-buttons">
            <button onClick={() => auth.signinRedirect()}>Sign in</button>
            <button onClick={() => signOutRedirect()}>Sign out</button>
          </div>
        </nav>
      </header>
  
      {/* Page content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/sponsor" element={<Sponsor />} />
      </Routes>
    </div>
  );
  
  
}

export default App;