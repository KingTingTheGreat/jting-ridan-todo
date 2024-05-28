"use client";
import { useState } from "react";
import { Entry } from "@/types";

const EditButton = ({ onClick, children }: { onClick: any; children: React.ReactNode }) => {
	return (
		<button onClick={onClick} className="mx-3 my-1 p-1 text-green-300">
			{children}
		</button>
	);
};

const EntryCardEdit = ({
	entry,
	updateEntry,
	removeEntry,
	exitEdit,
}: {
	entry: Entry;
	updateEntry: any;
	removeEntry: any;
	exitEdit: any;
}) => {
	const [entryEdit, setEntryEdit] = useState(entry);
	const [showDelete, setShowDelete] = useState(false);

	return (
		<>
			{showDelete ? (
				<div className="flex flex-col bg-[url('/favicon.ico')] bg-cover bg-center">
					<p>Are you sure you want to delete this entry?</p>
					<button onClick={() => removeEntry(entry)} className="m-1 p-1 text-lg font-medium">
						Yes
					</button>
					<button onClick={() => setShowDelete(false)} className="m-1 p-1 text-lg font-medium">
						No
					</button>
				</div>
			) : (
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
					<div className="flex justify-center">
						<EditButton onClick={() => exitEdit()}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="44"
								height="44"
								viewBox="0 0 24 24"
								fill="none"
								stroke="red"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<circle cx="12" cy="12" r="10"></circle>
								<line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
							</svg>
						</EditButton>
						<EditButton onClick={() => updateEntry(entryEdit)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="44"
								height="44"
								viewBox="0 0 24 24"
								fill="none"
								stroke="green"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<polyline points="20 6 9 17 4 12"></polyline>
							</svg>
						</EditButton>
					</div>
					<button onClick={() => setShowDelete(!showDelete)} className="m-1 p-1 text-lg font-medium">
						Delete
					</button>
				</div>
			)}
		</>
	);
};

export default EntryCardEdit;
