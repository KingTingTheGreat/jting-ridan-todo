import getCollection from "@/db";
import { Collection } from "mongodb";
import { NextResponse, NextRequest } from "next/server";
import { Entry, EntryInput } from "@/types";
import VerifyPassword from "@/utils/verifyPassword";
import generateId from "@/utils/generateId";

export const dynamic = "force-dynamic";

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

	const insertEntry: Entry = {
		id: generateId(),
		title: entryInput.title,
		description: entryInput.description,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		completed: false,
	};

	console.log("adding entry to db");
	console.log(insertEntry);

	const collection: Collection = await getCollection("todo-items");

	const acknoledged = await collection.insertOne(insertEntry);

	const cleanEntry: Entry = {
		id: insertEntry.id,
		title: insertEntry.title,
		description: insertEntry.description,
		createdAt: insertEntry.createdAt,
		updatedAt: insertEntry.updatedAt,
		completed: insertEntry.completed,
	};

	if (acknoledged.acknowledged) {
		return NextResponse.json(cleanEntry, { status: 200 });
	}

	console.log("entry not added to db");

	return NextResponse.json({ error: "Entry not added" }, { status: 500 });
}
