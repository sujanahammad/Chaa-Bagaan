import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/config";

function CreateAccount({ onAccountCreated }) {
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!businessName || !ownerName || !phone || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const cleanPhone = phone.replace(/\D/g, "");

      const internalEmail = `${cleanPhone}@chaabagaan.app`;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        internalEmail,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "businesses", user.uid), {
        businessName,
        ownerName,
        phone: cleanPhone,
        createdAt: serverTimestamp(),
        uid: user.uid,
      });

      onAccountCreated();
    } catch (error) {
      console.error(error);

      if (error.code === "auth/email-already-in-use") {
        setError("An account already exists with this phone number.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid phone number.");
      } else if (error.code === "auth/weak-password") {
        setError("Password is too weak.");
      } else {
        setError("Account creation failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="brand-area">
          <div className="brand-icon">☕</div>

          <h1>CHAA BAGAAN</h1>

          <p>Business Management</p>
        </div>

        <div className="form-header">
          <h2>Create Account</h2>
          <p>Set up your business account to get started.</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Business Name</label>

            <input
              type="text"
              placeholder="Enter business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Owner Name</label>

            <input
              type="text"
              placeholder="Enter owner name"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>

            <input
              type="tel"
              placeholder="01XXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <div className="auth-footer">
          <p>Your account will stay signed in on this device.</p>
        </div>

      </div>
    </div>
  );
}

export default CreateAccount;