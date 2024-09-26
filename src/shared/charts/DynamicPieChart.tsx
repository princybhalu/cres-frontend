import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  title: "My Daily Activities",
};

export default function App() {

  const handleClick = (entry : any ,value : any) => {
        // setSelectedSection(entry);
        console.log("entry : " , entry , value);
        
      };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
      //@ts-ignore
      onClick={handleClick}
    />
  );
}



// import React, { useState } from 'react';
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// interface DataItem {
//   name: string;
//   value: number;
// }

// interface PieChartProps {
//   data: { [key: string]: number };
// }

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// const DynamicPieChart: React.FC<PieChartProps> = ({ data }) => {
//   const [selectedSection, setSelectedSection] = useState<DataItem | null>(null);

//   const chartData: DataItem[] = Object.entries(data).map(([name, value]) => ({
//     name,
//     value,
//   }));

//   const handleClick = (entry: DataItem) => {
//     setSelectedSection(entry);
//   };

//   const CustomTooltip = ({ active, payload }: any) => {
//     if (active && payload && payload.length) {
//       const data = payload[0].payload;
//       return (
//         <div className="bg-white p-2 shadow-md rounded-md">
//           <p className="font-semibold">{data.name}</p>
//           <p>Value: {data.value}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   const RADIAN = Math.PI / 180;
//   //@ts-ignore
//   const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
//     return (
//       <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//         {`${(percent * 100).toFixed(0)}%`}
//       </text>
//     );
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto">
//       <div className="h-80 md:h-96">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={chartData}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               outerRadius="80%"
//               fill="#8884d8"
//               dataKey="value"
//               onClick={handleClick}
//               label={renderCustomizedLabel}
//             >
//               {chartData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip content={<CustomTooltip />} />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//       <div className="mt-4 flex flex-wrap justify-center">
//         {chartData.map((entry, index) => (
//           <div key={`legend-${index}`} className="flex items-center mr-4 mb-2">
//             <div
//               className="w-4 h-4 mr-2"
//               style={{ backgroundColor: COLORS[index % COLORS.length] }}
//             ></div>
//             <span>{entry.name}</span>
//           </div>
//         ))}
//       </div>
//       {selectedSection && (
//         <div className="mt-4 text-center">
//           <p className="font-semibold">Selected Section:</p>
//           <p>{selectedSection.name}: {selectedSection.value}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DynamicPieChart;