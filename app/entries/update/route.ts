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

	// get entry from input
	const entry: Entry = await req.json();
	entry.updatedAt = new Date().toISOString();

	const collection: Collection = await getCollection("todo-items");

	// update entry with entry.id in collection
	await collection.findOneAndUpdate({ id: entry.id }, { $set: entry });

	return NextResponse.json(entry, { status: 200 });
}
