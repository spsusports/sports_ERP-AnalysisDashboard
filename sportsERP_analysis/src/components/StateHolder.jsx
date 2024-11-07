import React, { useState, useEffect } from 'react';
import { db } from './../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import StateCard from './StateCard';

export default function StateHolder() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalInventory, setTotalInventory] = useState(0);
  const [workingInventory, setWorkingInventory] = useState(0);
  const [allocatedItems, setAllocatedItems] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [overdueRequests, setOverdueRequests] = useState(0);

  // Fetch counts from Firebase
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Total Users
        const userRolesSnapshot = await getDocs(collection(db, 'userRoles'));
        setTotalUsers(userRolesSnapshot.size);

        // Total Inventory
        let totalItems = 0;
        const inventorySnapshot = await getDocs(collection(db, 'inventory'));
        inventorySnapshot.forEach(doc => {
          const data = doc.data();
          for (const item in data) {
            if (data.hasOwnProperty(item)) {
              const itemData = data[item];
              if (itemData.working) {
                totalItems += itemData.working.new || 0;
                totalItems += itemData.working.good || 0;
                totalItems += itemData.working.normal || 0;
              }
              if (itemData.non_working) {
                totalItems += itemData.non_working.need_repair || 0;
                totalItems += itemData.non_working.broken || 0;
                totalItems += itemData.non_working.lost || 0;
              }
            }
          }
        });
        setTotalInventory(totalItems);

        // Working Inventory
        let workingItems = 0;
        inventorySnapshot.forEach(doc => {
          const data = doc.data();
          for (const item in data) {
            if (data.hasOwnProperty(item)) {
              const itemData = data[item];
              if (itemData.working) {
                workingItems += itemData.working.new || 0;
                workingItems += itemData.working.good || 0;
                workingItems += itemData.working.normal || 0;
              }
            }
          }
        });
        setWorkingInventory(workingItems);

        // Pending Requests
        const pendingSnapshot = await getDocs(query(collection(db, 'requests'), where('status', '==', 'pending')));
        setPendingRequests(pendingSnapshot.size);

        // Overdue Requests
        const overdueSnapshot = await getDocs(query(collection(db, 'requests'), where('status', '==', 'overdue')));
        setOverdueRequests(overdueSnapshot.size);

        // Allocated Items
        let allocatedCount = 0;
        inventorySnapshot.forEach(doc => {
          const data = doc.data();
          for (const item in data) {
            if (data.hasOwnProperty(item)) {
              const itemData = data[item];
              if (itemData.issued) {
                allocatedCount += itemData.issued || 0;
              }
            }
          }
        });
        setAllocatedItems(allocatedCount);

      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchCounts();

    // Optional: refresh data every minute
    const intervalId = setInterval(fetchCounts, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='d-flex flex-wrap w-auto gap-4'>
      <StateCard icon='bi-people' icolor='success' value={totalUsers} label='Total Users' />
      <StateCard icon='bi-box-seam' value={totalInventory} label='Total Inventory' />
      <StateCard icon='bi-check2-circle' icolor='success' value={workingInventory} label='Working Inventory' />
      <StateCard icon='bi-ui-checks' icolor='info' value={allocatedItems} label='Allocated Items' />
      <StateCard icon='bi-clock-history' icolor='info' value={pendingRequests} label='Pending Requests' />
      <StateCard icon='bi-exclamation-circle' icolor='danger' value={overdueRequests} label='Overdue Requests' />
    </div>
  );
}
