import { Entry } from "@/types";

const EntryCard = ({ entry }: { entry: Entry }) => {
	return (
		<div className="m-2 p-2 rounded-xl border-black border-2">
			<h2>{entry.title}</h2>
			<p>{entry.description}</p>
			<p>Created at: {entry.createdAt}</p>
			<p>Updated at: {entry.updatedAt}</p>
			<p>Completed: {entry.completed ? "Yes" : "No"}</p>
		</div>
	);
};

export default EntryCard;
