// import React from "react";

// interface StatusItemProps {
//   title: string;
//   count: number;
//   color: string;
// }

// const StatusItem: React.FC<StatusItemProps> = ({ title, count, color }) => (
//   <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-2">
//     <div 
//       className="text-white rounded-lg text-center p-4" 
//       style={{ backgroundColor: color }}
//     >
//       <h3 className="text-lg font-normal">{title}</h3>
//       <p className="text-3xl font-bold">{count}</p>
//     </div>
//   </div>
// );

// const StatusDashboard: React.FC<{ title: string }> = ({ title }) => {
//   const statuses = [
//     { title: 'New', count: 15, color: '#446ca5' },
//     { title: 'Pending for Approval', count: 3, color: '#f39c12' },
//     { title: 'Approved', count: 0, color: '#27ae60' },
//     { title: 'Applied', count: 0, color: '#b7950b' },
//     { title: 'Closed', count: 0, color: '#e74c3c' },
//     { title: 'Rejected', count: 12, color: '#8e3b47' },
//   ];

//   const date = new Date().toLocaleString("en-US", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: false,
//   });

//   return (
//     <div className="min-w-[320px] max-w-4xl mx-auto p-4">
//       <div className="bg-white rounded-lg shadow-lg p-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-gray-700">{title}</h2>
//           <p className="text-sm text-gray-500">{date}</p>
//         </div>
//         <div className="flex flex-wrap justify-around">
//           {statuses.map((status, index) => (
//             <StatusItem key={index} {...status} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatusDashboard;


import React from "react";

interface StatusItemProps {
  title: string;
  count: number;
  color: string;
}

const StatusItem: React.FC<StatusItemProps> = ({ title, count, color }) => (
  <div className="w-35">
    <div 
      className="text-white rounded-lg text-center p-2 h-ful" 
      style={{ backgroundColor: color }}
    >
      <h3 className="text-lg font-normal">{title}</h3>
      <p className="text-xl font-bold">{count}</p>
    </div>
  </div>
);

const StatusDashboard: React.FC<{ title: string }> = ({ title }) => {
  const statuses = [
    { title: 'New', count: 10, color: '#446ca5' },
    { title: 'Pending', count: 4, color: '#f39c12' },
    { title: 'Applied', count: 4, color: '#b7950b' },
    // { title: 'Closed', count: 0, color: '#e74c3c' },
    { title: 'Rejected', count: 6, color: '#8e3b47' },
    { title: 'Approved', count: 2, color: '#27ae60' },
  ];

  const date = new Date().toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="min-w-[320px] max-w-7xl mx-auto p-4">
      <div className="bg-gray-100 rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">{title !== "" ? title  : "Notifiction"}</h2>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {statuses.map((status, index) => (
            <StatusItem key={index} {...status} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusDashboard;