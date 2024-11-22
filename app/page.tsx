"use client";
import { useState } from "react";
import EntriesView from "@/components/entriesView";
import ridatoni from "@/public/ridatoni.svg";
import chocoloney from "@/public/chocoloney.svg";
import heart from "@/public/heart.svg";
import Image from "next/image";

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
						<div className="text-center p-10">
							<Image src={ridatoni} alt="ridatoni" />
							<h1 className="text-4xl m-8 p-2 border border-transparent border-4">Ridatoni</h1>
						</div>
						<div className="items-center text-center p-10">
							<Image src={chocoloney} alt="chocoloney" />
							<input
								className="border border-transparent border-4 hover:border-dashed hover:border-gray-600 bg-transparent p-2 m-8 rounded text-4xl w-60 text-center"
								// type="password"
								// placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>
					<button onClick={() => authorize()}>
						<Image src={heart} alt="heart" />
					</button>
				</div>
			)}
		</main>
	);
}
