"use client";
import { BarChart } from '@mui/x-charts/BarChart';
import { WaitTimeData } from "../types/waitTime";

function extractHour(hourStr: string) {
  const hour = parseInt(hourStr.slice(-2))-10;
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const period = hour < 12 ? "am" : "pm"
  return `${hour12}${period}`;
}

const chartSetting = {
  yAxis: [
    {
      label: 'Wait Time (Minutes)',
      width: 60,
    },
  ],
  width: 800,
  height: 300,
};

export default function DayBarChart({ waitTimes }: { waitTimes: WaitTimeData[] }) {
  if (waitTimes?.length === 0) {
    //TODO: make this look better
    return (
      <div>Data not found</div>
    )
  }
  const hours = waitTimes.map(wt => extractHour(wt.date));
  const waitTimesSecs = waitTimes.map(wt => wt.waitTimeSeconds / 60);
  return (
    <BarChart
      xAxis={[{ data: hours }]}
      series={[{ data: waitTimesSecs }]}
      {...chartSetting}
    />
  );
}