import WaitTimeLineChart from './WaitTimeLineChart';

//TODO: Temp dummy data
const data = [
  { hour: "09:00", "North Vancouver": 15, "Richmond": 20 },
  { hour: "10:00", "North Vancouver": 18, "Richmond": 22 },
  { hour: "11:00", "North Vancouver": 12, "Richmond": 19 },
  { hour: "12:00", "North Vancouver": 20, "Richmond": 25 },
  { hour: "13:00", "North Vancouver": 17, "Richmond": 21 },
];

// For week view just do id van-1, van-2 and names week day
const series = [
  { id: "north-vancouver", name: "North Vancouver", color: "#3b82f6" },
  { id: "richmond", name: "Richmond", color: "#f59e42" },
];

// day or week
// can multi select offices for day view
export default function ChartPanel() {
  return (
    <WaitTimeLineChart data={data} series={series} />
  );
}