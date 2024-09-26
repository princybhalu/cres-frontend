const tasks = [
    {
      id: 1,
      title: "Task One",
      description: "Description for Task One",
      location: "Location A",
      newCommentCount: 5,
      role: "admin",
      pendingTaskCount: 3, // For admin
      pendingProgressCount: 2,    // For admin (pending for review)
      remainingProgessToComplete: 4 // For user role
    },
    {
      id: 2,
      title: "Task Two",
      description: "Description for Task Two",
      location: "Location B",
      newCommentCount: 2,
      role: "user",
      pendingTaskCount: null, // Not applicable for user
      pendingProgressCount: null,     // Not applicable for user
      remainingProgessToComplete: 1   // For user role
    },
    {
      id: 3,
      title: "Task Three",
      description: "Description for Task Three",
      location: "Location C",
      newCommentCount: 0,
      role: "admin",
      pendingTaskCount: 1, // For admin
      pendingProgressCount: 5,    // For admin (pending for review)
      remainingProgessToComplete: 3 // For user role
    },
    {
      id: 4,
      title: "Task Four",
      description: "Description for Task Four",
      location: "Location D",
      newCommentCount: 8,
      role: "user",
      pendingTaskCount: null, // Not applicable for user
      pendingProgressCount: null,     // Not applicable for user
      remainingProgessToComplete: 2   // For user role
    },
    {
      id: 5,
      title: "Task Five",
      description: "Description for Task Five",
      location: "Location E",
      newCommentCount: 1,
      role: "admin",
      pendingTaskCount: 4, // For admin
      pendingProgressCount: 1,     // For admin (pending for review)
      remainingProgessToComplete: 5 // For user role
    },
  ];
  
export default tasks;
  