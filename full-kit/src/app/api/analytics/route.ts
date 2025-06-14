import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    console.log("Analytics event", data)
    return NextResponse.json({ success: true })
  } catch (_e) {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
