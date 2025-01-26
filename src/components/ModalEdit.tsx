import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {updateTask} from "@/features/taskSlice.tsx";

const ModalEdit = ({task, setClose}) => {
	const dispatch = useDispatch();
	const {register, handleSubmit, formState: {errors}} = useForm({
		mode: 'onChange',
	});

	const onSubmit = (data) => {
		const editItem = {
			id: task.id,
			...data
		}
		return dispatch(updateTask(editItem));
	}

	return (
		<>
			<form className="flex flex-col space-y-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
	bg-white rounded-lg p-4 shadow-2xl  z-10"
			      onSubmit={handleSubmit(onSubmit)}>
				<h2 className="text-fuchsia-500 text-center text-2xl font-medium">Edit</h2>
				<div className="flex space-x-2">
					<div>
						<input
							{...register('title',
								{
									required: {
										message: "Task name is required!",
										value: true
									}
								})}
							className="w-full  h-auto px-3 py-2 bg-white rounded-md border border-fuchsia-600 focus:outline-none
						focus:ring-sky-500 text-fuchsia-900"
							name="title"
							type="text"
							defaultValue={task.title}
							placeholder="Task name"/>
					</div>

					<div>
					<textarea
						{...register('description',
							{
								required: {
									message: 'Task description is required!',
									value: true
								}
							})}
						className="w-full px-3 bg-white py-2 rounded-md border border-fuchsia-600 text-fuchsia-800 focus:outline-none"
						placeholder="Task description"
						name="description"
						defaultValue={task.description}
						rows={1}>
					</textarea>
					</div>
				</div>

				<div>
					<select
						{...register('status',
							{
								required: {
									message: "Type is required!",
									value: true
								}
							}
						)}
						className="w-full px-3 py-2 bg-white rounded-md border border-fuchsia-600 text-fuchsia-800"
						name="status" defaultValue={task.status}>
						<option value="To Do">To Do</option>
						<option value="In Progress">In Progress</option>
						<option value="Completed">Completed</option>
					</select>
				</div>
				<div className="flex justify-center space-x-5">
					<button
						className="bg-white p-2
						hover:before:-inset-4 hover:text-3xl hover:skew-y-3 cursor-pointer"
						type="submit">
						<span
							className="">
                            <span className="relative text-fuchsia-800">Save</span>
                         </span>

					</button>
					<button
						className="bg-white p-2
						hover:before:-inset-4 hover:text-3xl hover:skew-y-3 cursor-pointer"
						onClick={setClose}>
						<span
							className="">
                            <span className="relative text-fuchsia-800">Close</span>
                         </span>

					</button>
				</div>
			</form>
		</>
	);
}

export default ModalEdit;