import { configureStore } from '@reduxjs/toolkit'
import projectReducer from "./project/projectSlice"
import pageReducer from "./page/pageSlice"


export default configureStore({
    reducer: {
        project: projectReducer,
        page: pageReducer
    },
})