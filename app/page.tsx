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
		<main className="flex min-h-screen flex-col items-center">
			{authorized ? (
				<>
					<h1 className="text-5xl font-bold p-4 m-2 text-center">JTing RidaN Todo</h1>
					<EntriesView password={password} attemptAuth={authorized} />
				</>
			) : (
				<div className="flex flex-col items-center justify-center min-h-screen">
					<div className="flex items-center">
						<h1 className="text-4xl p-2">Ridatoni</h1>
						<input
							className="border border-gray-300 p-2 rounded text-lg w-40"
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button
						onClick={() => authorize()}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded max-w-40">
						Authorize
					</button>
				</div>
			)}
		</main>
	);
}
