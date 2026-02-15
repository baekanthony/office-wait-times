import OfficesTabs from './components/OfficesTabs';
import SummaryCard from './components/SummaryCard';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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
      <OfficesTabs />
    </div>
    </main>
  );
}
