export interface ProjectForDashboard {
    id: number;
    name: string;
    description: string;
    location: string;
    newCommentCount: number;
    role: string;
    pendingTaskCount?: number; // For admin
    pendingProgressCount?: number; // For admin (pending for review)
    remainingProgessToComplete?: number; // For user role
    progress_percentage: number; 
    picture?:string
  }