"use client";

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { WaitTime } from '../types/waitTime';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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
  const [waitTimesMap, setWaitTimesMap] = React.useState<Map<string, WaitTime[]>>(new Map());
  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    fetch('/api/wait-times')
      .then(res => res.json())
      .then(data => {
        const waitTimesMap = new Map<string, WaitTime[]>();
        (data.items || []).forEach((waitTime: WaitTime) => {
        if (!waitTimesMap.has(waitTime.officeId)) {
          waitTimesMap.set(waitTime.officeId, []);
        }
          waitTimesMap.get(waitTime.officeId)!.push(waitTime);
      });
        setWaitTimesMap(waitTimesMap);
        setLoading(false);
      });
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (loading) return <div>Loading</div>;

  return (
    <Box sx={{ width: '100%', display: 'flex' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" orientation="vertical">
          {Array.from(waitTimesMap.entries()).map(([officeId, waitTimes], i) => (
            <Tab key={officeId} label={waitTimes[0]?.officeName || officeId} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Box>
      <Box>
        <Tabs>
          <Tab label="Average week" />
          <Tab label="This week" />
        </Tabs>
        {Array.from(waitTimesMap.entries()).map(([officeId, waitTimes], i) => (
          <CustomTabPanel key={officeId} value={value} index={i}>
            {waitTimes.map(waitTime => (
              <div key={waitTime.date}>
                {waitTime.date}: {waitTime.waitTimeSeconds} seconds
              </div>
            ))}
          </CustomTabPanel>
        ))}
      </Box>
    </Box>
  );
}
