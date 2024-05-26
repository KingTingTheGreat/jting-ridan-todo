"use client";
import { useState } from "react";
import { Entry } from "@/types";

const EntryCard = ({ entryInitial, password }: { entryInitial: Entry; password: string }) => {
	const [entry, setEntry] = useState(entryInitial);

	const updateEntry = async () => {
		const myHeaders = new Headers();
		myHeaders.append("Authorization", password);

		const res = await fetch("/entries/update", {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify(entry),
		});

		const updatedEntry = await res.json();

		setEntry(updatedEntry);
	};

	const toggleCompleted = async () => {
		entry.completed = !entry.completed;
		await updateEntry();
	};

	return (
		<div className="m-2 p-2 rounded-xl border-black border-2 text-wrap min-w-80 max-w-80">
			<h2>{entry.title}</h2>
			<p>{entry.description}</p>
			<p>Created at: {entry.createdAt}</p>
			<p>Updated at: {entry.updatedAt}</p>
			<p>Completed: {entry.completed ? "Yes" : "No"}</p>
			<svg
				onClick={toggleCompleted}
				xmlns="http://www.w3.org/2000/svg"
				width="40"
				height="40"
				viewBox="0 0 24 24"
				fill={entry.completed ? "lightgreen" : "none"}
				stroke="#000000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round">
				<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
				<polyline points="22 4 12 14.01 9 11.01"></polyline>
			</svg>
		</div>
	);
};

export default EntryCard;
