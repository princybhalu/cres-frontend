import React from "react";
// import { GasPump, Signal, SignalZero, Clock, Fuel, Truck } from 'lucide-react';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface StatusItemProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
  percentage?: number;
}

const StatusItem: React.FC<StatusItemProps> = ({
  icon,
  label,
  value,
  color,
  percentage,
}) => (
  <div className="flex items-center justify-between p-2 bg-white rounded-lg shadow">
    <div className="flex items-center space-x-2">
      <div className={`p-2 rounded-full ${color}`}>{icon}</div>
      <div>
        <p className="text-sm font-semibold text-gray-600">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
    {percentage !== undefined && (
      <div style={{ width: 50, height: 50 , color: "#2f1380" }}>
        <CircularProgressbar value={percentage} text={`${percentage}%`} />
      </div>
    )}
  </div>
);

const SiteStatusDashboard: React.FC<{ title: string }> = ({
  title,
}: {
  title: string;
}) => {
  const date = new Date("2024-02-26T17:00:00").toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="min-w-4xl mx-auto p-4">
      <div className="bg-gray-100 rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">{title}</h2>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          <StatusItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                />
              </svg>
            }
            label="Total Progress"
            value={784}
            color="bg-blue-300"
          />
          <StatusItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                />
              </svg>
            }
            label="Approve"
            value={728}
            color="bg-green-300"
            percentage={93}
          />
          <StatusItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            }
            label="Pending"
            value={32}
            color="bg-gray-300"
            percentage={4}
          />
          <StatusItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            }
            label="Rejected"
            value={22}
            color="bg-red-300"
            percentage={3}
          />
        </div>
      </div>
    </div>
  );
};

export default SiteStatusDashboard;
