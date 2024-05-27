import getCollection from "@/db";
import { Collection } from "mongodb";
import { NextResponse, NextRequest } from "next/server";
import { Entry } from "@/types";
import VerifyPassword from "@/utils/verifyPassword";

export const dynamic = "force-dynamic";

export async function DELETE(req: NextRequest) {
	const inputPw = req.headers.get("Authorization");

	const success = await VerifyPassword(inputPw as string);

	if (!success) {
		return NextResponse.json({ entries: undefined }, { status: 401 });
	}

	// get entry from input
	const entry: Entry = await req.json();

	const collection: Collection = await getCollection("todo-items");

	// delete entry from collection
	const res = await collection.deleteOne({ id: entry.id });

	return NextResponse.json(res, { status: 200 });
}
