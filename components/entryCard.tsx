"use client";
import { useState } from "react";
import { Entry } from "@/types";
import EntryCardContent from "./entryCardContent";
import EntryCardEdit from "./entryCardEdit";

const EntryCard = ({
	removeEntry,
	entryInitial,
	password,
}: {
	removeEntry: any;
	entryInitial: Entry;
	password: string;
}) => {
	const [entry, setEntry] = useState(entryInitial);
	const [edit, setEdit] = useState(false);

	const updateEntry = async (entry: Entry) => {
		setEntry(entry);
		const myHeaders = new Headers();
		myHeaders.append("Authorization", password);

		const res = await fetch("/entries/update", {
			method: "PUT",
			headers: myHeaders,
			body: JSON.stringify(entry),
		});

		// likely not necessary
		const updatedEntry = await res.json();
		setEntry(updatedEntry);
		setEdit(false);
	};

	const toggleCompleted = async () => {
		entry.completed = !entry.completed;
		await updateEntry(entry);
	};

	return (
		<div className="m-2 p-2 rounded-xl border-black border-2 text-wrap min-w-80 max-w-80">
			{!edit && <button onClick={() => setEdit(true)}>Edit</button>}
			{edit && <button onClick={() => setEdit(false)}>Close</button>}
			{!edit ? (
				<EntryCardContent entry={entry} toggleCompleted={toggleCompleted} />
			) : (
				<EntryCardEdit entry={entry} updateEntry={updateEntry} removeEntry={removeEntry} />
			)}
		</div>
	);
};

export default EntryCard;
