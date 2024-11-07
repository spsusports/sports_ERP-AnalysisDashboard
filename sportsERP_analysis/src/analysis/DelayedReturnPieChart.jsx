import React, { useEffect, useState } from 'react';
import { fetchRequests } from './../hooks/firebaseHelper'; // Import the helper function
import PieChartComponent from './../components/PieChartComponent'; // Import your pie chart component

const DelayedReturnPieChart = () => {
  const [dataMatrix, setDataMatrix] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const requests = await fetchRequests(); // Fetch requests data
      const delayedRequests = {};
      let onTimeCount = 0;
      let totalRequests = 0;

      // Analyze delayed and on-time returns
      for (const request of Object.values(requests)) {
        const game = request.game;
        const returnDate = request.returnDate;
        const actReturnTime = request.act_returntime;

        if (returnDate && actReturnTime) {
          if (actReturnTime > returnDate) {
            delayedRequests[game] = (delayedRequests[game] || 0) + 1;
          } else {
            onTimeCount++;
          }
          totalRequests++;
        }
      }

      // Prepare data for pie chart
      const data = [
        ['onTimeReturn', (onTimeCount / totalRequests) * 100, 'Requests with no delay']
      ];
      for (const [game, count] of Object.entries(delayedRequests)) {
        data.push([game, (count / totalRequests) * 100, `Delayed requests for ${game}`]);
      }

      setDataMatrix(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const legendColors = ['#4caf50', '#f44336', '#2196f3', '#ff9800', '#9c27b0'];

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <PieChartComponent
          dataMatrix={dataMatrix}
          graphTitle="Delayed Returns Analysis"
          legendColors={legendColors}
        />
      )}
    </div>
  );
};

export default DelayedReturnPieChart;
