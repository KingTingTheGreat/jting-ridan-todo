"use client";
import { useState } from "react";
import { Entry } from "@/types";

const EntryCardEdit = ({ entry, updateEntry, removeEntry }: { entry: Entry; updateEntry: any; removeEntry: any }) => {
	const [entryEdit, setEntryEdit] = useState(entry);

	return (
		<div className="flex flex-col">
			<input
				type="text"
				value={entryEdit.title}
				placeholder="Title"
				required={true}
				onChange={(e) => setEntryEdit({ ...entryEdit, title: e.target.value })}
			/>
			<textarea
				value={entryEdit.description}
				placeholder="Description"
				required={true}
				onChange={(e) => setEntryEdit({ ...entryEdit, description: e.target.value })}
			/>
			<button onClick={() => updateEntry(entryEdit)}>Update</button>
			<button onClick={() => removeEntry(entry)}>Delete</button>
		</div>
	);
};

export default EntryCardEdit;
