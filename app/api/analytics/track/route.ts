import { recordPageView, type PageView } from "@/lib/analytics-store"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as PageView
    recordPageView(body)
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error("[analytics-track]", e)
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
