"use client";
import { useState } from "react";
import EntriesView from "@/components/entriesView";

export default function Home() {
	const [password, setPassword] = useState("");
	const [authorized, setAuthorized] = useState(false);

	const authorize = async () => {
		const myHeaders = new Headers();
		myHeaders.append("Authorization", password);

		fetch("/authorization", {
			method: "POST",
			headers: myHeaders,
			redirect: "follow",
		})
			.then((response) => response.json())
			.then((result) => {
				setAuthorized(result.success);
			})
			.catch((error) => console.error(error));
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className={`${authorized ? "hidden" : "visible"}`}>
				<h1 className="text-4xl">Ridatoni</h1>
				<input
					className="border border-gray-300 p-2 rounded"
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					onClick={() => authorize()}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Authorize
				</button>
			</div>

			<div className={`text-2xl ${authorized ? "text-green-500" : "text-red-500"}`}>
				{authorized ? "Authorized" : "Unauthorized"}
			</div>

			<EntriesView password={password} attemptAuth={authorized} />
		</main>
	);
}
