"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const GRID_COLOUR = "#e6ebe5";
const AXIS_COLOUR = "#806b6b";
const TOOLTIP_BG_COLOUR = "#fff";
const TOOLTIP_TEXT_COLOUR = "#3e5137";

interface ChartDataPoint {
  hour: string;
  [key: string]: string | number;
}

interface Series {
  id: string;
  name: string;
  color: string;
}

interface WaitTimeLineChartProps {
  data: ChartDataPoint[];
  series: Series[];
}

export default function WaitTimeLineChart({ data, series }: WaitTimeLineChartProps) {  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOUR} />
        <XAxis 
          dataKey="hour" 
          stroke={AXIS_COLOUR}
          tick={{ fill: AXIS_COLOUR, fontSize: 12 }}
        />
        <YAxis 
          stroke={AXIS_COLOUR}
          tick={{ fill: AXIS_COLOUR, fontSize: 12 }}
          label={{ value: 'Minutes', angle: -90, position: 'insideLeft', fill: AXIS_COLOUR }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: TOOLTIP_BG_COLOUR, 
            border: `1px solid ${GRID_COLOUR}`,
            borderRadius: '6px'
          }}
          labelStyle={{ color: TOOLTIP_TEXT_COLOUR, fontWeight: 600 }}
        />
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="line"
        />
        {series.map(item => (
          <Line 
            key={item.id}
            type="monotone" 
            dataKey={item.name}
            stroke={item.color}
            strokeWidth={2}
            dot={{ fill: item.color, r: 3 }}
            activeDot={{ stroke: AXIS_COLOUR, r: 5 }}
            name={item.name}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}