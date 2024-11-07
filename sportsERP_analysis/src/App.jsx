import React, { useState, useEffect } from 'react';
import './App.css';
import { auth, db, googleProvider } from './firebaseConfig'; // Import Firebase configuration
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import NavBar from './components/NavBar';
import StateHolder from './components/StateHolder';
import logo from './assets/spsulogo.png';
import GraphPanel from './components/GraphPanel';

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
            <div className="container-fluid p-3 backgound-color">
              <StateHolder />
              <GraphPanel />
            </div>
          </div>
        ) : (
          <p>Unauthorized Access</p>
        )
      ) : (
        <div className="login-popup">
          <div className="login-container">
            <img src={logo} height='45' className='mb-2'></img>
            <h2 className='h4 mb-2'>Admin Login</h2>
            <button className="btn btn-primary" onClick={handleLoginWithGoogle}>
              Sign in with Google
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
