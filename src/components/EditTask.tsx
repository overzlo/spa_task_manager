import {useState} from "react";
import ModalEdit from "@/components/ModalEdit.tsx";

export function EditTask({task}) {
	const [isEdit, setEdit] = useState(false);

	return (
		<>
			{isEdit ? <ModalEdit task={task} setClose={() => setEdit(false)}/>
				:
				<button className="px-3 py-2 bg-white text-fuchsia-600 rounded-sm hover:bg-sky-400"
				        onClick={() => setEdit(true)}>
					Edit task
				</button>
			}

		</>
	)
}

