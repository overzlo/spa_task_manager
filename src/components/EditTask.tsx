import {useState} from "react";
import ModalEdit from "@/components/ModalEdit.tsx";
import {ITaskData} from "@/features/models.ts";

type TTaskProps = {
	task: ITaskData;
}
export function EditTask({task} : TTaskProps) {
	const [isEdit, setEdit] = useState<boolean>(false);

	return (
		<>
			{isEdit ? <ModalEdit task={task} setClose={setEdit}/>
				:
				<button className="px-3 py-2 bg-white text-fuchsia-600 rounded-sm hover:bg-sky-400"
				        onClick={() => setEdit(true)}>
					Edit task
				</button>
			}


		</>
	)
}

