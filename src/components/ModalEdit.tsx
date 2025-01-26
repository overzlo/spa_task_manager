import {useForm} from "react-hook-form";
import {updateTask} from "@/features/taskSlice.tsx";
import {useAppDispatch} from "@/features/hooks.ts";
import {ITaskData} from "@/features/models.ts";
import {Dispatch, SetStateAction} from "react";

type TTaskProps = {
	task: ITaskData,
	setClose: Dispatch<SetStateAction<boolean>>
}

export interface IFormData {
	title: string,
	description: string,
	status: string
}

const ModalEdit = ({task, setClose}: TTaskProps,) => {
	const dispatch = useAppDispatch();
	const {register, handleSubmit, formState: {errors}} = useForm<IFormData>({
		mode: 'onChange',
	});

	const onSubmit = (data: IFormData) => {
		const editItem = {
			id: task.id,
			...data
		}
		return dispatch(updateTask(editItem as ITaskData));
	}

	return (
		<>
			<form className="flex flex-col space-y-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
	bg-white rounded-lg p-4 shadow-2xl z-10"
			      onSubmit={handleSubmit(onSubmit)}>
				<h2 className="text-fuchsia-500 text-center text-2xl font-medium">Edit</h2>
				<div className="flex space-x-2">
					<div className="relative">
						<input
							{...register('title', {
								required: {
									message: "Task name is required!",
									value: true
								}
							})}
							className="w-full h-auto px-3 py-2 bg-white rounded-md border border-fuchsia-600 focus:outline-none focus:ring-sky-500 text-fuchsia-900"
							name="title"
							type="text"
							defaultValue={task.title}
							placeholder="Task name"
						/>
						{errors.title && (
							<p className="text-red-500 text-2xl">{errors.title.message}</p>
						)}
					</div>

					<div className="relative">
						<textarea
							{...register('description', {
								required: false
							})}
							className="w-full px-3 bg-white py-2 rounded-md border border-fuchsia-600 text-fuchsia-800 focus:outline-none"
							placeholder="Task description"
							name="description"
							defaultValue={task.description}
							rows={1}
						/>

					</div>
				</div>

				<div className="relative">
					<select
						{...register('status', {
							required: false
						})}
						className="w-full px-3 py-2 bg-white rounded-md border border-fuchsia-600 text-fuchsia-800"
						name="status" defaultValue={task.status}>
						<option value="To Do">To Do</option>
						<option value="In Progress">In Progress</option>
						<option value="Completed">Completed</option>
					</select>

				</div>

				<div className="flex justify-center space-x-5">
					<button
						className="bg-white p-2 hover:text-3xl hover:skew-x-3 cursor-pointer transition-all duration-200"
						type="submit">
						<span className="relative text-fuchsia-800">Save</span>
					</button>
					<button
						className="bg-white p-2 hover:text-3xl hover:skew-y-3 cursor-pointer transition-all duration-200"
						onClick={() => {
							setClose(false)
						}}>
						<span className="relative text-fuchsia-800">Close</span>
					</button>
				</div>
			</form>
		</>
	);
}

export default ModalEdit;
