import React from 'react';

interface Task {
  id: string;
  project_id: string;
  user_id: string;
  title: string;
  description: string;
  status: string;
  media: string[];
  progress_percentage: number;
  due_date: string | null;
}

interface CardProps {
  task: Task;
}

const DisplayCards: React.FC<CardProps> = ({ task }) => {
console.log(task);
console.log("dis");


  return (
    <div className="max-w-sm mx-auto border border-gray-300 rounded-lg shadow-lg overflow-hidden">
      <img
        src={task.media[0]} // Display the first media item
        alt={task.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
        <p className="text-gray-700 mb-2">{task.description}</p>
        <p className="text-sm text-gray-500 mb-2">Status: {task.status}</p>
        <p className="text-sm text-gray-500 mb-2">Progress: {task.progress_percentage}%</p>
        <p className="text-sm text-gray-500">
          Due Date: {task.due_date ? task.due_date : 'Not specified'}
        </p>
      </div>
    </div>
  );
};

export default DisplayCards;
