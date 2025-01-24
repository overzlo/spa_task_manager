import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const initialState = {
	task: [],
	loading: false,
	error: null,
	status: 'All'
}

export const fetchTodo = createAsyncThunk(
	'tasks/fetchTodo',
	async () => {
		const response = await fetch('http://localhost:3000/tasks');
		const data = await response.json();
		return data
	}
)

const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action) => {
			console.log(action.payload)
			console.log(state.task= [action.payload, ...state.task])
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodo.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchTodo.fulfilled, (state, action) => {
				state.loading = false
				state.task = (action.payload)
			})
			.addCase(fetchTodo.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})
	}
})

export const {addTask} = taskSlice.actions;
export default taskSlice.reducer;