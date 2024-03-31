import VerifyPassword from "@/utils/verifyPassword";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
	const inputPw = req.headers.get("Authorization");

	const success = await VerifyPassword(inputPw as string);

	if (!success) {
		return NextResponse.json({ success: false }, { status: 401 });
	}

	return NextResponse.json({ success: true }, { status: 200 });
}
