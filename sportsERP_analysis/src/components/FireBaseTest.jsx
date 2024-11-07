import React, { useState } from 'react';
import { db } from './../firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

function FireBaseTest() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Write to database
  const addItem = async () => {
    try {
      setLoading(true);
      await addDoc(collection(db, 'ReactUsers'), { name: 'vinay Jain' });
      console.log('User added to Firestore!');
      showUsers(); // Refresh the list after adding
    } catch (err) {
      setError('Failed to add user.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Read from database
  const showUsers = async () => {
    setLoading(true);
    try {
      const usersSnapshot = await getDocs(collection(db, 'ReactUsers'));
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    } catch (err) {
      setError('Failed to fetch users.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="Fb-title h2">Firebase Test</h2>
      <div className="container my-3">
        <button onClick={addItem} className="btn btn-primary me-2" disabled={loading}>
          Add User
        </button>
        <button onClick={showUsers} className="btn btn-secondary" disabled={loading}>
          Show Users
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      
      <ul className="list-group mt-3">
        {users.map(user => (
          <li key={user.id} className="list-group-item">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FireBaseTest;
