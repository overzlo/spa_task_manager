import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTodo} from "../features/taskSlice.tsx";

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
					<li key={task.id}
					    className="bg-fuchsia-600 p-4 rounded-xl
						    shadow-sm hover:shadow-md cursor-pointer hover:bg-fuchsia-500
						    flex justify-between items-center px-5 py-2">
						<div>
							<p className="text-xl font-medium text-white">{task.title}</p>
							{task.description && <p className="text-white text-md">{task.description}</p>}
							<p className="mt-1 text-lg font-semibold text-white">
								Status: <span className="italic underline text-white">{task.status}</span></p>
						</div>
						<div className="flex space-x-2">
							<button
								className="px-3 py-2 bg-white text-fuchsia-600 rounded-sm hover:bg-sky-400">Edit
							</button>
							<button
								className="px-3 py-2 bg-white text-fuchsia-600 rounded-sm hover:bg-rose-400">Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>

	);
};

export default TaskList;