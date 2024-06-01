"use client";
import { useState, useEffect } from "react";
import { Entry } from "@/types";
import EntryCard from "@/components/entryCard";
import NewEntryCard from "./newEntryCard";

const enum SortBy {
	DateCreated = "Date Created",
	LastUpdated = "Last Updated",
	Title = "Title",
	Complete = "Complete",
}

const EntriesView = ({ password, attemptAuth }: { password: string; attemptAuth: boolean }) => {
	const [entries, setEntries] = useState<Entry[]>([]);
	const [sortBy, setSortBy] = useState<SortBy>(SortBy.LastUpdated);
	const [createNewEntry, setCreateNewEntry] = useState<boolean>(false);

	const authorize = async () => {
		const myHeaders = new Headers();
		myHeaders.append("Authorization", password);

		fetch("/entries/all", {
			method: "POST",
			headers: myHeaders,
			redirect: "follow",
		})
			.then((response) => response.json())
			.then((result) => {
				setEntries(
					result.entries.sort((a: Entry, b: Entry) => {
						const dateA = new Date(a.updatedAt).getTime();
						const dateB = new Date(b.updatedAt).getTime();
						return dateB - dateA;
					})
				);
			})
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		if (attemptAuth) {
			authorize();
		}
	}, [password, attemptAuth]);

	useEffect(() => {
		console.log(sortBy);
		switch (sortBy) {
			case SortBy.DateCreated:
				setEntries(
					[...entries].sort((a, b) => {
						const dateA = new Date(a.createdAt).getTime();
						const dateB = new Date(b.createdAt).getTime();
						return dateA - dateB;
					})
				);
				break;
			case SortBy.LastUpdated:
				setEntries(
					[...entries].sort((a, b) => {
						const dateA = new Date(a.updatedAt).getTime();
						const dateB = new Date(b.updatedAt).getTime();
						return dateB - dateA;
					})
				);
				break;

			case SortBy.Title:
				setEntries([...entries].sort((a, b) => a.title.localeCompare(b.title)));
				break;

			case SortBy.Complete:
				setEntries(
					[...entries].sort((a, b) => {
						return b === a ? 0 : b ? -1 : 1;
					})
				);
				break;
		}
	}, [sortBy, entries.length]);

	if (!attemptAuth) {
		return <></>;
	}

	const removeEntry = async (entryDelete: Entry) => {
		const myHeaders = new Headers();
		myHeaders.append("Authorization", password);

		const res = await fetch("/entries/delete", {
			method: "DELETE",
			headers: myHeaders,
			body: JSON.stringify(entryDelete),
		});

		if (res.status === 200) {
			setEntries(entries.filter((entry) => entry.id !== entryDelete.id));
		}
	};

	return (
		<div>
			<div className="flex justify-center p-2">
				<button onClick={() => setCreateNewEntry(!createNewEntry)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="44"
						height="44"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#000000"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round">
						<line x1="12" y1="5" x2="12" y2="19"></line>
						<line x1="5" y1="12" x2="19" y2="12"></line>
					</svg>
				</button>
				<select
					className="w-max-content p-2 bg-inherit border border-black rounded-md"
					onChange={(e) => {
						setSortBy(e.target.value as SortBy);
					}}
					defaultValue={SortBy.LastUpdated}>
					<option value={SortBy.DateCreated}>{SortBy.DateCreated}</option>
					<option value={SortBy.LastUpdated}>{SortBy.LastUpdated}</option>
					<option value={SortBy.Title}>{SortBy.Title}</option>
					<option value={SortBy.Complete}>{SortBy.Complete}</option>
				</select>
				<div
					className="p-2 h-10 flex"
					onClick={() => {
						setEntries([...entries].reverse());
					}}>
					<svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="rotate(90)">
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							{" "}
							<path d="M17.6,4.2l-4-3a1,1,0,0,0-1.05-.09A.977.977,0,0,0,12,2V4H1A1,1,0,0,0,1,6H12V8a.988.988,0,0,0,.55.89A.99.99,0,0,0,13.6,8.8l4-3a1,1,0,0,0,0-1.6Z"></path>{" "}
							<path d="M.4,12.2l4-3a1,1,0,0,1,1.05-.09A.977.977,0,0,1,6,10v2H17a1,1,0,0,1,0,2H6v2a.988.988,0,0,1-.55.89A.99.99,0,0,1,4.4,16.8l-4-3a1,1,0,0,1,0-1.6Z"></path>
						</g>
					</svg>
				</div>
			</div>

			{createNewEntry && (
				<NewEntryCard
					password={password}
					appendEntry={(entry: Entry) => {
						console.log(entry);
						setCreateNewEntry(false);
						setEntries([...entries, entry]);
					}}
				/>
			)}

			{entries.map((entry) => (
				<EntryCard key={entry.id} removeEntry={removeEntry} entryInitial={entry} password={password} />
			))}
		</div>
	);
};

export default EntriesView;
