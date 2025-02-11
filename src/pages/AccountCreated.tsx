import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  // Extract Cognito group
  const cognitoGroups: string[] = auth.user?.profile?.["cognito:groups"] as string[] || [];
  const userGroup = cognitoGroups[0]?.toLowerCase(); // Ensure case consistency

  // Function to navigate to the correct dashboard
  const handleGoToDashboard = () => {
    switch (userGroup) {
      case "driver":
        navigate("/driver-dashboard");
        break;
      case "sponsor":
        navigate("/sponsor-dashboard");
        break;
      case "admin":
        navigate("/admin-dashboard");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎉 Sign-Up Successful! 🎉</h1>
      <p>Welcome! Your account has been successfully created.</p>
      <p>Click the button below to proceed to your dashboard.</p>

      <button 
        onClick={handleGoToDashboard} 
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Go to My Dashboard
      </button>
    </div>
  );
};

export default Success;