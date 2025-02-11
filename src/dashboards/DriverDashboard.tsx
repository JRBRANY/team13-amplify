import { useAuth } from "react-oidc-context";

const DriverDashboard = () => {
  const auth = useAuth();
  const cognitoGroups: string[] = auth.user?.profile?.["cognito:groups"] as string[] || [];

  return (
    <div>
      <h1>Driver Dashboard</h1>
      <p>Welcome, Driver!</p>

      <pre> Hello: {auth.user?.profile.email} </pre>
      <pre> ID Token: {auth.user?.id_token} </pre>
      <pre> Access Token: {auth.user?.access_token} </pre>
      <pre> Refresh Token: {auth.user?.refresh_token} </pre>
      <pre> Group: {cognitoGroups[0]} </pre>

      <button onClick={() => auth.removeUser()}>Sign out</button>
    </div>
  );
};

export default DriverDashboard;