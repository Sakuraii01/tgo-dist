import Router from "./routers/router";
import { AuthProvider } from "./auth/auth.provider";
function App() {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
}

export default App;
