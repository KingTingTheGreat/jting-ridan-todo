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
				setEntries(result.entries);
			})
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		if (attemptAuth) {
			authorize();
		}
	}, [password, attemptAuth]);

	useEffect(() => {
		switch (sortBy) {
			case SortBy.DateCreated:
				setEntries(
					[...entries].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
				);
			case SortBy.LastUpdated:
				setEntries(
					[...entries].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
				);

			case SortBy.Title:
				setEntries([...entries].sort((a, b) => a.title.localeCompare(b.title)));

			case SortBy.Complete:
				setEntries(
					[...entries].sort((a, b) => {
						return b === a ? 0 : b ? -1 : 1;
					})
				);
		}
	}, [sortBy]);

	if (entries.length === 0 && attemptAuth) {
		return (
			<div>
				<NewEntryCard
					password={password}
					appendEntry={(entry: Entry) => {
						setEntries([...entries, entry]);
					}}
				/>
			</div>
		);
	}

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
			<NewEntryCard
				password={password}
				appendEntry={(entry: Entry) => {
					setEntries([...entries, entry]);
				}}
			/>
			<div className="flex justify-end p-2">
				<select
					className="w-max-content p-2 bg-inherit border border-black rounded-md"
					onChange={(e) => {
						setSortBy(e.target.value as SortBy);
					}}>
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
						<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							{" "}
							<path d="M17.6,4.2l-4-3a1,1,0,0,0-1.05-.09A.977.977,0,0,0,12,2V4H1A1,1,0,0,0,1,6H12V8a.988.988,0,0,0,.55.89A.99.99,0,0,0,13.6,8.8l4-3a1,1,0,0,0,0-1.6Z"></path>{" "}
							<path d="M.4,12.2l4-3a1,1,0,0,1,1.05-.09A.977.977,0,0,1,6,10v2H17a1,1,0,0,1,0,2H6v2a.988.988,0,0,1-.55.89A.99.99,0,0,1,4.4,16.8l-4-3a1,1,0,0,1,0-1.6Z"></path>
						</g>
					</svg>
				</div>
			</div>

			{entries.map((entry) => (
				<EntryCard key={entry.id} removeEntry={removeEntry} entryInitial={entry} password={password} />
			))}
		</div>
	);
};

export default EntriesView;
