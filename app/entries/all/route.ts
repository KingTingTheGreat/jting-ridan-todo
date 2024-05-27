import getCollection from "@/db";
import { Collection } from "mongodb";
import { NextResponse, NextRequest } from "next/server";
import { Entry } from "@/types";
import VerifyPassword from "@/utils/verifyPassword";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
	const inputPw = req.headers.get("Authorization");

	const success = await VerifyPassword(inputPw as string);

	if (!success) {
		return NextResponse.json({ entries: undefined }, { status: 401 });
	}

	const collection: Collection = await getCollection("todo-items");

	const entries = await collection.find().toArray();

	const cleanEntries: Entry[] = entries.map((entry): Entry => {
		return {
			id: entry.id,
			title: entry.title,
			description: entry.description,
			createdAt: entry.createdAt,
			updatedAt: entry.updatedAt,
			completed: entry.completed,
		};
	});

	console.log(cleanEntries);

	return NextResponse.json({ entries: cleanEntries }, { status: 200 });
}
