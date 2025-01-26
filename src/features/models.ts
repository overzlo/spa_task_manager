export  type TTaskStatus = 'To Do' | 'In Progress' | 'Completed';

export interface ITaskData {
	id: string,
	title: string,
	description: string,
	status: TTaskStatus
}

export interface ITaskState {
	task: ITaskData[],
	loading: boolean,
	error: string | null,
	status: 'All' | TTaskStatus
}

//для формы


