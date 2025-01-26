import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ITaskData, ITaskState} from "@/features/models.ts";

const initialState: ITaskState = {
	task: [],
	loading: false,
	error: null,
	status: 'All'
}

export const fetchTodo = createAsyncThunk<ITaskData[], void>(
	'tasks/fetchTodo',
	async (_, {rejectWithValue}) => {
		try {
			const response = await fetch('http://localhost:3000/tasks');
			if (!response.ok) {
				throw new Error('something went wrong');
			}
			const data: ITaskData[] = await response.json();
			return data;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			} else {
				return rejectWithValue('unknown error');
			}
		}
	}
);

export const addTask = createAsyncThunk<ITaskData, ITaskData>(
	'tasks/addTask',
	async (newTask: ITaskData, {rejectWithValue}) => {
		try {
			const response = await fetch('http://localhost:3000/tasks', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(newTask)
			});
			if (!response.ok) {
				throw new Error('something went wrong');
			}
			return newTask;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			} else {
				return rejectWithValue('unknown error');
			}
		}
	}
);

export const deleteTask = createAsyncThunk<ITaskData["id"], ITaskData["id"]>(
	'tasks/deleteTask',
	async (taskId: string, {rejectWithValue}) => {
		try {
			const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
				method: 'DELETE'
			})

			if (!response.ok) {
				throw new Error('something went wrong');
			}
			return taskId as ITaskData["id"];
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			} else {
				return rejectWithValue('unknown error');
			}
		}
	}
)


export const updateTask = createAsyncThunk<ITaskData, ITaskData>(
	'tasks/updateTask',
	async (updatedTask: ITaskData, {rejectWithValue}) => {
		try {
			const response = await fetch(`http://localhost:3000/tasks/${updatedTask.id}`, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(updatedTask)
			})
			if (!response.ok) {
				throw new Error('something went wrong');
			}
			return updatedTask as ITaskData;
		} catch (error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			} else {
				return rejectWithValue('unknown error');
			}
		}
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
				state.error = action.error.message as string | null
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
				state.error = action.error.message as string | null
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				state.loading = false
				state.task = state.task.filter(task => task.id !== action.payload)
			})
			.addCase(deleteTask.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message as string | null
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