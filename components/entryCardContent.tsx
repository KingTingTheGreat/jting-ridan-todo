import { Entry } from "@/types";
import formatDateString from "@/utils/formatDateString'";

const EntryCardContent = ({ entry, toggleCompleted }: { entry: Entry; toggleCompleted: any }) => {
	return (
		<>
			<h2 className="text-lg font-semibold">{entry.title}</h2>
			<p>{entry.description}</p>
			<p>Created: {formatDateString(entry.createdAt)}</p>
			<p>Updated: {formatDateString(entry.updatedAt)}</p>
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
		</>
	);
};

export default EntryCardContent;
