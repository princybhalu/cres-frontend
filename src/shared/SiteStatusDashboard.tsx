import React from "react";
// import { GasPump, Signal, SignalZero, Clock, Fuel, Truck } from 'lucide-react';
import LocationIcon from "./icons/location-icon";
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
      <div style={{ width: 50, height: 50 }}>
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
        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-700">{title}</h2>
          <p className="text-sm text-gray-500 mt-1 md:mt-0">{date}</p>
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
            label="Total Task"
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
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                />
              </svg>
            }
            label="Active"
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
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            }
            label="Delayed"
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
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
                />
              </svg>
            }
            label="Completed"
            value={22}
            color="bg-orange-300"
            percentage={3}
          />
        </div>
      </div>
    </div>
  );
};

export default SiteStatusDashboard;
