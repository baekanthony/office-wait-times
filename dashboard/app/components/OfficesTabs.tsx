"use client";

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


interface WaitTime {
  officeId: string;
  officeName: string;
  date: string;
  waitTimeSeconds: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function OfficesTabs() {
  const [waitTimes, setWaitTimes] = React.useState<WaitTime[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    fetch('/api/wait-times')
      .then(res => res.json())
      .then(data => {
        setWaitTimes(data.items || []);
        setLoading(false);
      });
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (loading) return <div>Loading</div>;

  //TODO: group by officeId for each tab
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {waitTimes.map((waitTime, i) => (
            <Tab key={waitTime.officeName} label={waitTime.officeName} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Box>
      {waitTimes.map((waitTime, i) => (
        <CustomTabPanel key={waitTime.officeId} value={value} index={i}>
          {waitTime.officeName} ({waitTime.officeId}): {waitTime.date}: {waitTime.waitTimeSeconds} seconds
        </CustomTabPanel>
      ))}
    </Box>
  );
}
