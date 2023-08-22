import { createSlice } from '@reduxjs/toolkit';

export const pageSlice = createSlice({
    name: 'page',
    initialState: {
        lightMode: localStorage.getItem("lightMode") === "light",
        account: null,
        showModal: false,
        modalType: ""
    },
    reducers: {
        setLightMode: (state, action) => {
            state.lightMode = action.payload;
            if (action.payload) {
                localStorage.setItem("lightMode", "light");
            } else {
                localStorage.setItem("lightMode", "dark");
            }
        },
        toggleLightMode: (state, action) => {
            if (state.lightMode) {
                localStorage.setItem("lightMode", "dark");
            } else {
                localStorage.setItem("lightMode", "light");
            }
            state.lightMode = !state.lightMode;
        },
        setAccount: (state, action) => {
            state.account = action.payload;
        },
        setShowModal: (state, action) => {
            state.showModal = action.payload;
        },
        setModalType: (state, action) => {
            state.modalType = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setLightMode,
    toggleLightMode,
    setAccount,
    setShowModal,
    setModalType,
} = pageSlice.actions;

export default pageSlice.reducer;