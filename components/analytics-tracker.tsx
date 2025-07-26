"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const sessionKey = `viewed_${pathname}`
    if (sessionStorage.getItem(sessionKey)) return
    sessionStorage.setItem(sessionKey, "true")

    const visitorKey = "visitor_id"
    let visitorId = localStorage.getItem(visitorKey)
    if (!visitorId) {
      visitorId = `v_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
      localStorage.setItem(visitorKey, visitorId)
    }

    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        timestamp: Date.now(),
        referrer: document.referrer,
        visitorId,
      }),
    }).catch((err) => console.error("Failed to track page view:", err))
  }, [pathname])

  return null
}
