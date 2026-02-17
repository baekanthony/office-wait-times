import WaitTimeLineChart from './components/WaitTimeLineChart';
import OfficesTabs from './components/OfficesTabs';
import SummaryCard from './components/SummaryCard';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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

export default function Home() {
  return (
    <main>
      <h1>Office Wait Times</h1>
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard 
            title="title" 
            value="20" 
            icon={AccessTimeIcon}
            iconColour="text-blue-500"
          />
          <SummaryCard 
            title="title" 
            value="20" 
            icon={AccessTimeIcon}
            iconColour="text-blue-500"
          />
            <SummaryCard 
            title="title" 
            value="20" 
            icon={AccessTimeIcon}
            iconColour="text-blue-500"
          />
            <SummaryCard 
            title="title" 
            value="20" 
            icon={AccessTimeIcon}
            iconColour="text-blue-500"
          />
        </div>
      </div>
      {/* TODO: Should live inside a component that determins the input it gets */}
      <div style={{ width: "100%", height: 300 }}>
        <WaitTimeLineChart data={data} series={series} />
      </div>
    </div>
    </main>
  );
}
