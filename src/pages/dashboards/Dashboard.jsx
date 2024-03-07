
import React, { useEffect, useState } from 'react';
import { models } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import axios from 'axios';
import { BEARER_TOKEN } from '../../utils/constants';

const Dashboard = () => {

  const [reportConfig, setReportConfig] = useState({
    type: 'report',
    embedUrl: undefined,
    accessToken: undefined,
    id: undefined,
    tokenType: models.TokenType.Embed,
    settings: {
      panes: {
        filters: {
          expanded: false,
          visible: true
        }
      },
      background: models.BackgroundType.Transparent,
    }
  });

  useEffect(() => {
    setReportConfig(prevState => ({
      ...prevState,
      embedUrl: "x",
      accessToken: "y",
      id: "z"
    }));
    console.log(reportConfig)
  }, []);

  return (
  <> 
    <div>
        <PowerBIEmbed
          embedConfig = {reportConfig}
          cssClassName = 'power-bi-report-class'
        />
    </div>
  </>
  )
}

export default Dashboard