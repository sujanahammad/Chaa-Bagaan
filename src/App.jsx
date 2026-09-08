import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase/config";

import CreateAccount from "./pages/CreateAccount";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
    return (
      <div className="loading-screen">
        <div className="loading-logo">☕</div>
        <h2>CHAA BAGAAN</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <CreateAccount
        onAccountCreated={() => {
          // Firebase automatically keeps the user signed in.
        }}
      />
    );
  }

  return <Dashboard />;
}

export default App;