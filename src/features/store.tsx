import {configureStore} from "@reduxjs/toolkit";
import taskSlice from "./taskSlice.tsx";

export const store = configureStore({
	reducer: {
		tasks: taskSlice
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
