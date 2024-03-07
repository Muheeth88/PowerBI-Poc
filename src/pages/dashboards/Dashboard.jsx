
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [dashboardDetails, setDashboardDetails] = useState({reportName: null, embedUrl: null});
  useEffect(() => {
    getDetails()
  }, []);

  const getDetails = () => {
    let reportName = localStorage.getItem('reportname');
    let embedUrl = localStorage.getItem('embedurl');
    setDashboardDetails({reportName, embedUrl})
    console.log("D Details" , dashboardDetails)
  }
 
  return (<>
    <div>
      <div>Dashboard</div>
        <div>
          <div>Report Name : {dashboardDetails.reportName}</div>
          <div>Embed Url : {dashboardDetails.embedUrl}</div>
        </div>

    </div>
  </>)
}

export default Dashboard