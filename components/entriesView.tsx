"use client";
import { useState, useEffect } from "react";
import { Entry } from "@/types";
import EntryCard from "@/components/entryCard";
import NewEntryCard from "./newEntryCard";

const EntriesView = ({ password, attemptAuth }: { password: string; attemptAuth: boolean }) => {
	const [entries, setEntries] = useState<Entry[]>([]);

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
				console.log(result[0]);
				setEntries(result.entries);
			})
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		if (attemptAuth) {
			authorize();
		}
	}, [password, attemptAuth]);

	if (entries.length === 0 && attemptAuth) {
		return <div>No entries available</div>;
	}

	if (!attemptAuth) {
		return <></>;
	}

	return (
		<div>
			<NewEntryCard
				password={password}
				appendEntry={(entry: Entry) => {
					setEntries([...entries, entry]);
				}}
			/>
			{entries.map((entry) => (
				<EntryCard key={entry.id} entryInitial={entry} password={password} />
			))}
		</div>
	);
};

export default EntriesView;
