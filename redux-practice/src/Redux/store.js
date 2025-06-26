import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import themeReducer from "./themeSlice"
import todoReducer from "./todoSlice";


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        theme: themeReducer,
        todo: todoReducer
    }
})