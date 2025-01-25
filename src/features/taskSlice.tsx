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
export const addTask = createAsyncThunk(
	'tasks/addTask',
	async (newTask) => {
		await fetch(`http://localhost:3000/tasks`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(newTask)
		});
		return newTask;
	}
)
export const deleteTask = createAsyncThunk(
	'tasks/deleteTask',
	async (taskId) => {
		await fetch(`http://localhost:3000/tasks/${taskId}`, {
			method: 'DELETE'
		})
		return taskId;
	}
)


export const updateTask = createAsyncThunk(
	'tasks/updateTask',
	async (updatedTask) => {
		await fetch(`http://localhost:3000/tasks/${updatedTask.id}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(updatedTask)
		})
		return updatedTask;
	}
)

const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodo.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchTodo.fulfilled, (state, action) => {
				state.loading = false
				state.task = action.payload.reverse()
			})
			.addCase(fetchTodo.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})
			.addCase(addTask.fulfilled, (state, action) => {
				state.loading = false
				state.task = [action.payload, ...state.task]
			})
			.addCase(addTask.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(addTask.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				state.loading = false
				state.task = state.task.filter(task => task.id !== action.payload)
			})
			.addCase(deleteTask.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				state.task = state.task.map((task) =>
					task.id === action.payload.id
						? action.payload
						: task)
			})
	}
})
export default taskSlice.reducer;