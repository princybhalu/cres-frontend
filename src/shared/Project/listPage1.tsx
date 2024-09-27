import React, { useState } from 'react';
// import { Calendar, Search,  } from 'lucide-react';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GridIcon from '../icons/grid-icon';
import ListIcon from "../icons/list-icon";
import MenuPinIcon from '../icons/map-pin-icon';
import PlusIcon from '../icons/plus-icon';
import MapPinIcon from '../icons/map-pin-icon';



interface Task {
  id: number;
  title: string;
  description: string;
  location: string;
  newCommentCount: number;
  role: 'admin' | 'user';
  pendingTaskCount: number | null;
  pendingProgressCount: number | null;
  remainingProgessToComplete: number;
}

const tasks: Task[] = [
  // ... (your provided task data here)
];

const TaskList: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTaskCard = (task: Task) => (
    <div key={task.id} className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
      <p className="text-gray-600 mb-2">{task.description}</p>
      <p className="text-sm text-gray-500 mb-2">Updated at: {new Date().toLocaleDateString()}</p>
      <div className="flex items-center mb-2">
        <div className="w-4 h-4 mr-1 text-gray-500">
        <MapPinIcon  />
        </div>
        <span className="text-sm text-gray-600">{task.location}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-blue-600">
          {task.newCommentCount} new comments
        </span>
        {task.role === 'admin' ? (
          <div>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
              {task.pendingTaskCount} pending tasks
            </span>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {task.pendingProgressCount} pending progress
            </span>
          </div>
        ) : (
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {task.remainingProgessToComplete} remaining progress
          </span>
        )}
      </div>
    </div>
  );

  const renderTaskList = (task: Task) => (
    <div key={task.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <div className="flex items-center">
        <div className="w-4 h-4 mr-1 text-gray-500">
        <MapPinIcon  />
        </div>
          <span className="text-sm text-gray-600">{task.location}</span>
        </div>
      </div>
      <p className="text-gray-600 mt-2">{task.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">Updated at: {new Date().toLocaleDateString()}</span>
        <div>
          {task.role === 'admin' ? (
            <>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                {task.pendingTaskCount} pending tasks
              </span>
              <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                {task.pendingProgressCount} pending progress
              </span>
            </>
          ) : (
            <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
              {task.remainingProgessToComplete} remaining progress
            </span>
          )}
          <span className="text-sm font-medium text-blue-600">
            {task.newCommentCount} new comments
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button className='size-sm w-4 h-4 mr-2'>
          <PlusIcon /> Add Project
        </button>
        <div className="flex items-center space-x-2">
          <button
            // variant={viewMode === 'grid' ? "default" : "outline"}
            // size="icon
            onClick={() => setViewMode('grid')}
          >
            <GridIcon  />
          </button>
          <button
            // variant={viewMode === 'list' ? "default" : "outline"}
            // size="icon"
            onClick={() => setViewMode('list')}
          >
            <ListIcon  />
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          {/* <Select onValueChange={setDateFilter} defaultValue={dateFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="lastDay">Last day</SelectItem>
              <SelectItem value="lastWeek">Last week</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select> */}
        </div>
      </div>
      <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'grid-cols-1'}`}>
        {filteredTasks.map(task => viewMode === 'grid' ? renderTaskCard(task) : renderTaskList(task))}
      </div>
    </div>
  );
};

export default TaskList;