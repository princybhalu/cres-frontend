import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProjectRedux {
    id: string;
    name: string;
    location: string;
  }

interface ProjectsState {
  projects: ProjectRedux[];
}

const initialState: ProjectsState = {
  projects: [],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<ProjectRedux>) => {
      state.projects.push(action.payload); // Add the new project
    },
    removeProject: (state, action: PayloadAction<{ id: string }>) => {
      state.projects = state.projects.filter(project => project.id !== action.payload.id); // Remove the project by ID
    },
  },
});

// Export the actions
export const { addProject, removeProject } = projectsSlice.actions;

// Export the selector to get project details
export const selectProjects = (state: { projects: ProjectsState }) => state.projects.projects;

// Export the reducer
export default projectsSlice.reducer;
