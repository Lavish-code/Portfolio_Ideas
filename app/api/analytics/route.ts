import { getAnalyticsSummary } from "@/lib/analytics-store"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    return NextResponse.json(getAnalyticsSummary())
  } catch (e) {
    console.error("[analytics-get]", e)
    return NextResponse.json({}, { status: 500 })
  }
}
