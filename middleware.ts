import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const RATE_LIMIT = 60
const WINDOW = 60000
const hits = new Map<string, { count: number; time: number }>()

export function middleware(req: NextRequest) {
  const ip = req.ip ?? "unknown"
  const now = Date.now()

  const entry = hits.get(ip) ?? { count: 0, time: now }

  if (now - entry.time > WINDOW) {
    entry.count = 0
    entry.time = now
  }

  entry.count++
  hits.set(ip, entry)

  if (entry.count > RATE_LIMIT) {
    return new NextResponse("Too Many Requests", { status: 429 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/:path*"]
}
