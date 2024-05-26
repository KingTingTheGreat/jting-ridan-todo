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
	const entry: Entry = await req.json();

	if (!cachedCollection) {
		cachedCollection = await getCollection("todo-items");
	}

	// update entry with entry.id in collection
	await cachedCollection.findOneAndUpdate({ id: entry.id }, { $set: entry });

	return NextResponse.json(entry, { status: 200 });
}
