import {EditTask} from "@/components/EditTask.tsx";
import {deleteTask} from "@/features/taskSlice.tsx";
import {useAppDispatch} from "@/features/hooks.ts";
import {ITaskData} from "@/features/models";

type TTaskProps = {
	task: ITaskData;
}

const TaskItem = ({task}: TTaskProps) => {
	const dispatch = useAppDispatch();
	return (
		<li
			className="bg-fuchsia-600 p-4 rounded-xl
						    shadow-sm hover:shadow-md cursor-pointer hover:bg-fuchsia-500
						    flex justify-between items-center px-5 py-2">
			<div>
				<p className="text-xl font-medium text-white">{task.title}</p>
				{task.description && <p className="text-white text-md">{task.description}</p>}
				<p className="mt-1 text-lg font-semibold text-white">
					Status: <span className="italic underline text-white">{task.status}</span></p>
			</div>
			<div className="flex space-x-2 items-center ">
				<div>
					<EditTask task={task}/>
				</div>
				<button
					title="Delete Task"
					className="h-10 px-3 py-2 bg-white text-fuchsia-600 rounded-sm hover:bg-rose-400"
					onClick={() => dispatch(deleteTask(task.id))}>
					Delete
				</button>

			</div>
		</li>
	)
}

export default TaskItem