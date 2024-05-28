import { Entry } from "@/types";
import formatDateString from "@/utils/formatDateString'";

const EntryCardContent = ({
	entry,
	toggleCompleted,
	enterEdit,
}: {
	entry: Entry;
	toggleCompleted: any;
	enterEdit: any;
}) => {
	return (
		<>
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold">{entry.title}</h2>
				<button onClick={() => enterEdit()} className="top-1 left-1">
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
						<path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
						<polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
					</svg>
				</button>
			</div>
			<p>{entry.description}</p>
			<p>Created: {formatDateString(entry.createdAt)}</p>
			<p>Updated: {formatDateString(entry.updatedAt)}</p>
			{/* <p>Completed: {entry.completed ? "Yes" : "No"}</p> */}
			<div className="flex justify-center">
				<button onClick={toggleCompleted}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="44"
						height="44"
						viewBox="0 0 24 24"
						fill={entry.completed ? "lightgreen" : "none"}
						stroke="#000000"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round">
						<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
						<polyline points="22 4 12 14.01 9 11.01"></polyline>
					</svg>
				</button>
			</div>
		</>
	);
};

export default EntryCardContent;
