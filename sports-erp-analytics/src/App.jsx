// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AnalyticsContainer from './components/AnalyticsContainer';
import { db } from './firebaseConfig'; // Import Firestore configuration

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection('requests').get();
      const requestsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData({ requests: requestsData });
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      {data ? <AnalyticsContainer data={data} /> : <p>Loading data...</p>}
    </div>
  );
};

export default App;
