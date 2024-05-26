import getCollection from "@/db";
import { Collection } from "mongodb";
import { NextResponse, NextRequest } from "next/server";
import { Entry, EntryInput } from "@/types";
import VerifyPassword from "@/utils/verifyPassword";
import generateId from "@/utils/generateId";

export const dynamic = "force-dynamic";

let cachedCollection: Collection | null = null;

export async function POST(req: NextRequest) {
	const inputPw = req.headers.get("Authorization");

	const success = await VerifyPassword(inputPw as string);

	if (!success) {
		return NextResponse.json({ entries: undefined }, { status: 401 });
	}

	// get entry from input
	const entryInput: EntryInput = await req.json();

	if (!entryInput.title || !entryInput.description) {
		return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
	}

	const entry: Entry = {
		id: generateId(),
		title: entryInput.title,
		description: entryInput.description,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		completed: false,
	};

	console.log("adding entry to db");
	console.log(entry);

	if (!cachedCollection) {
		cachedCollection = await getCollection("todo-items");
	}

	const acknoledged = await cachedCollection.insertOne(entry);

	if (acknoledged.acknowledged) {
		return NextResponse.json(entry, { status: 200 });
	}

	console.log("entry not added to db");

	return NextResponse.json({ error: "Entry not added" }, { status: 500 });
}
