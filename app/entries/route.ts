import { NextResponse, NextRequest } from "next/server";
import { Entry } from "@/types";
import VerifyPassword from "@/utils/verifyPassword";

export const dynamic = "force-dynamic";

const Entries: Entry[] = [
	{
		id: "1",
		title: "First Entry",
		description: "This is the first entry.",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		completed: false,
	},
	{
		id: "2",
		title: "Second Entry",
		description: "This is the second entry.",
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		completed: false,
	},
];

export async function POST(req: NextRequest) {
	const inputPw = req.headers.get("Authorization");

	const success = await VerifyPassword(inputPw as string);

	if (!success) {
		console.log("/entries 401");
		return NextResponse.json({ entries: undefined }, { status: 401 });
	}

	console.log("/entries 200");
	return NextResponse.json({ entries: Entries }, { status: 200 });
}
