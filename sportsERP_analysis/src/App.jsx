import React, { useState, useEffect } from 'react';
import './App.css';
import { auth, db, googleProvider } from './firebaseConfig'; // Import Firebase configuration
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import NavBar from './components/NavBar';
import StateHolder from './components/StateHolder';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track if user is authenticated

  useEffect(() => {
    const checkAdminAuth = async (user) => {
      try {
        if (user) {
          const email = user.email;
          const userRef = doc(db, "userRoles", email);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists() && userDoc.data().role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      checkAdminAuth(user);
      setIsAuthenticated(!!user); // Update authentication state
    });

    return () => unsubscribe();
  }, []);

  const handleLoginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider); // Sign-in with Google
    } catch (error) {
      console.error("Error during Google login:", error.message);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {isAuthenticated ? (
        isAdmin ? (
          <div>
            <NavBar />
            <div className="container-fluid p-3">
              <StateHolder />
            </div>
          </div>
        ) : (
          <p>Unauthorized Access</p>
        )
      ) : (
        <div className="login-popup">
          <div className="login-container">
            <h2>Please Log in with Google</h2>
            <button className="google-login-btn" onClick={handleLoginWithGoogle}>
              Sign in with Google
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
