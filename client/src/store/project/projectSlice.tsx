import { createSlice } from '@reduxjs/toolkit';

export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        userProjects: [],
        currentProject: null,
    },
    reducers: {
        setCurrentProject: (state, action) => {
            state.currentProject = action.payload;
        },
        setUserProjects: (state, action) => {
            state.userProjects = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCurrentProject, setUserProjects, } = projectSlice.actions;

export default projectSlice.reducer;