"use client";
import { useState } from "react";
import { EntryInput } from "@/types";

const NewEntryCard = ({ password, appendEntry }: { password: string; appendEntry: any }) => {
	const [entry, setEntry] = useState<EntryInput>({
		title: "",
		description: "",
	});

	const insertEntry = async () => {
		const myHeaders = new Headers();
		myHeaders.append("Authorization", password);

		const res = await fetch("/entries/insert", {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify(entry),
		});

		const newEntry = await res.json();
		appendEntry(newEntry);
		setEntry({ title: "", description: "" });
	};

	return (
		<div className="m-2 p-2 rounded-xl flex flex-col border-black border-2 text-wrap min-w-80 max-w-80">
			<input
				className="p-2 bg-inherit"
				type="text"
				value={entry.title}
				placeholder="Title"
				required={true}
				onChange={(e) => setEntry({ ...entry, title: e.target.value })}
			/>
			<textarea
				className="p-2 bg-inherit"
				value={entry.description}
				placeholder="Description"
				required={true}
				onChange={(e) => setEntry({ ...entry, description: e.target.value })}
			/>
			<div className="flex justify-center">
				<button onClick={insertEntry} className="bg-green-200 w-fit m-2 py-2 px-4 rounded-2xl">
					Create Entry
				</button>
			</div>
		</div>
	);
};

export default NewEntryCard;
