import {useForm} from "react-hook-form";
import {v4 as uuidv4} from 'uuid';
import {addTask} from "../features/taskSlice.tsx";
import {useAppDispatch} from "@/features/hooks.ts";
import {IFormData} from "@/components/ModalEdit.tsx";
import {ITaskData} from "@/features/models.ts";

const AddTask = () => {
	const {register, handleSubmit, reset, formState: {errors}} = useForm<IFormData>({
		mode: 'onChange',
	});
	const dispatch = useAppDispatch();
	const onSubmit = (data: IFormData) => {
		const newTask = {
			id: uuidv4(),
			...data
		}
		dispatch(addTask(newTask as ITaskData));
		reset()
	}
	return (
		<div className="mb-7">
			<h2 className="text-4xl font-semibold my-7 text-fuchsia-500 italic">Add a new task...</h2>
			<form className="flex flex-col space-y-6"
			      onSubmit={handleSubmit(onSubmit)}>
				<div>
					<input
						{...register('title',
							{
								required: {
									message: "Task name is required!",
									value: true
								}
							})}
						className="w-full px-3 py-2 rounded-md border border-fuchsia-600 focus:outline-none
						focus:ring-sky-500 text-fuchsia-900"
						name="title"
						type="text"
						placeholder="Task name"/>
					{errors.title && (
						<p className="text-red-500 text-2xl italic">{errors.title.message}</p>
					)}
				</div>
				<div>
					<textarea
						{...register('description', {
							maxLength: {
								value: 30,
								message: "Description cannot be more than 30 symbols!"
							}
						})}
						className="w-full px-3 py-2 rounded-md border border-fuchsia-600 text-fuchsia-800 focus:outline-none"
						placeholder="Task description"
						name="description"
						rows={4}
					/>
					{errors.description && (
						<p className="text-red-500 text-2xl italic">{errors.description.message}</p>
					)}
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
						className="w-full px-3 py-2 rounded-md border border-fuchsia-600 text-fuchsia-800"
						name="status">
						<option value="To Do">To Do</option>
						<option value="In Progress">In Progress</option>
						<option value="Completed">Completed</option>
					</select>

				</div>
				<div className="flex justify-center">
					<button
						className="transition delay-75 duration-500 ease-in text-2xl relative inline-block before:absolute before:-inset-3 before:block before:-skew-y-5 before:bg-fuchsia-600
						hover:before:-inset-4 hover:text-3xl hover:skew-y-3 cursor-pointer"
						type="submit">
						<span className="relative text-white">Add it!</span>
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddTask;