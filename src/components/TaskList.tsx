	import {ChangeEvent, useEffect, useMemo, useState} from 'react';
	import {fetchTodo} from "../features/taskSlice.tsx";
	import TaskItem from "@/components/TaskItem.tsx";
	import {useAppDispatch, useAppSelector} from "@/features/hooks.ts";
	import {TTaskStatus} from "@/features/models.ts";

	const TaskList = () => {
		const tasks = useAppSelector(state => state.tasks.task)
		const loading = useAppSelector(state => state.tasks.loading)
		const error = useAppSelector(state => state.tasks.error)
		const dispatch = useAppDispatch();

		const [selectedStatus, setSelectedStatus] = useState<'All' | TTaskStatus>('All');

		const statusSet = useMemo<TTaskStatus[]>(() => Array.from(new Set(tasks.map(task => task.status))), [tasks]);

		useEffect(() => {
			dispatch(fetchTodo())
		}, [dispatch]);

		if (loading) {
			return <p className="text-center mt-[50vh] text-zinc-700 font-semibold text-3xl">Loading...</p>
		}
		if (error) {
			return <p>Error: {error}</p>
		}

		const sortedTasks = tasks.filter(task =>
			selectedStatus === 'All' || task.status === selectedStatus)

		const selectStatusRender= (
			<select
				className="p-2 text-fuchsia-600 font-medium border border-fuchsia-100 rounded mb-4"
				value={selectedStatus}
				onChange={(e:ChangeEvent<HTMLSelectElement>) => setSelectedStatus(e.target.value as 'All'| TTaskStatus)}>
				<option value="All">All</option>
				{statusSet.map((status, index) => (
					<option key={index} value={status}>
						{status}
					</option>
				))}
			</select>
		);

		const renderTaskList =
			sortedTasks.length > 0 ?
				sortedTasks.map(task => (
					<TaskItem key={task.id} task={task}/>
				))
				:
				<p className="text-center text-fuchsia-600 font-medium text-2xl mt-4">No task!</p>


		return (
			<div className="mb-12">
				<ul className="space-y-3">
					{selectStatusRender}
					{renderTaskList}
				</ul>
			</div>

		);
	};

	export default TaskList;