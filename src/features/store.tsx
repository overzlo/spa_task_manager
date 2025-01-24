import {configureStore} from "@reduxjs/toolkit";
import taskSlice from "./taskSlice.tsx";


export const store = configureStore({
	reducer: {
		tasks: taskSlice
	}
})