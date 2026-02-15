import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: Icon;
  iconColour: string;
}

export default function SummaryCard({ title, value, subtitle, icon: Icon, iconColour }: SummaryCardProps) {
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-semibold">{value}</p>
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className={`${iconColour} bg-gray-50 p-3 rounded-lg`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
