## **Sports ERP Analytics Panel Overview**
This analytics panel provides the university’s sports department with insights into equipment demand, user trends, and return compliance. It allows for data-driven decision-making by analyzing past patterns and predicting future equipment needs.

---

### **1. Demand Analysis for Sports and Equipment Types**
   - **Description**: Analyze how frequently each sport and its equipment are requested, giving insights into which sports have the highest demand.
   - **Calculation**: Count requests for each unique combination of `Sports` and `Equipment`.
   - **Visualization**: Bar chart displaying total requests by equipment and sport.
   - **Future Prediction**: Using historical demand data, we can predict future demand through a simple moving average or linear regression, factoring in seasonal peaks like tournament seasons.

### **2. Request Trends Over Time**
   - **Description**: Track how requests change daily, weekly, or monthly to identify peak usage periods.
   - **Calculation**: Group requests by day, week, or month using `Request Date`, then count the total requests within each time interval.
   - **Visualization**: Line chart showing the number of requests over time.
   - **Future Prediction**: Seasonal trends and moving averages will project likely peaks in future requests, helping prepare for high-demand periods.

### **3. Return Compliance**
   - **Description**: Measure the return compliance rate, identifying on-time vs. delayed returns for better inventory management.
   - **Calculation**:
     - On-time: Requests where `Actual Return Date` is on or before `Return Date`.
     - Delayed: Requests where `Actual Return Date` is after `Return Date`.
     - Compliance Rate = (On-time Returns / Total Returns) * 100
   - **Visualization**: Pie chart showing percentages of on-time and delayed returns.
   - **Future Prediction**: Based on past return compliance, we can predict potential delays during peak periods, especially for frequently requested items.

### **4. Frequent Users**
   - **Description**: Identify students who make the most requests, useful for understanding engagement levels.
   - **Calculation**: Group by `Enrollment No.` and count requests per student.
   - **Visualization**: Leaderboard-style bar chart of top users.
   - **Future Prediction**: Predict future frequent users by assessing the rate of request frequency growth for individual students.

### **5. Enrollment-Based Analysis**
   - **Description**: Track requests by enrollment year to see which groups or academic years are most active.
   - **Calculation**: Extract year from `Enrollment No.`, then count requests by year.
   - **Visualization**: Pie or bar chart showing requests grouped by enrollment year.
   - **Future Prediction**: Based on year-wise activity trends, predict the expected demand from incoming enrollment batches.

### **6. Condition Monitoring**
   - **Description**: Track equipment condition upon issuance and return to assess maintenance and replacement needs.
   - **Calculation**: Count instances of each condition (`good`, `normal`, `new`, etc.) at issuance and return. Calculate degradation rates by comparing issuance and return conditions.
   - **Visualization**: Heatmap or bar chart for tracking equipment condition over time.
   - **Future Prediction**: Using historical degradation rates, project when specific equipment may need repairs or replacement.

### **7. Top 5 Students with Most Delayed Returns**
   - **Description**: Identify students with the highest counts of delayed returns, aiding in accountability.
   - **Calculation**: Filter for delayed returns, group by `Enrollment No.`, and count occurrences, then sort to find the top 5.
   - **Visualization**: List or bar chart displaying students with the most delays.
   - **Future Prediction**: Identify potential repeat delays by monitoring patterns in previous delayed returns.
