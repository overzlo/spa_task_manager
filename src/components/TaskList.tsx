import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTodo} from "../features/taskSlice.tsx";
import TaskItem from "@/components/TaskItem.tsx";

const TaskList = () => {
	const tasks = useSelector(state => state.tasks.task)
	const loading = useSelector(state => state.tasks.loading)
	const error = useSelector(state => state.tasks.error)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTodo())
	}, [dispatch]);

	if (loading) {
		return <p className="text-center mt-[50vh] text-zinc-700 font-semibold text-3xl">Loading...</p>
	}
	if (error) {
		return <p>Error: {error}</p>
	}

	return (
		<div className="mb-12">
			<ul className="space-y-4">
				{tasks?.map(task => (
					<TaskItem key={task.id} task={task}/>
				) ) }
			</ul>
		</div>

	);
};

export default TaskList;