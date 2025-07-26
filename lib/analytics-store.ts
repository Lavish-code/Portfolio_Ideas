export type PageView = {
  path: string
  timestamp: number
  referrer: string
  visitorId: string
}

const analyticsData = {
  totalViews: 0,
  pathViews: new Map<string, number>(),
  dailyVisitors: new Map<string, Set<string>>(),
}

export function recordPageView(data: PageView) {
  analyticsData.totalViews += 1

  // per-page views
  analyticsData.pathViews.set(data.path, (analyticsData.pathViews.get(data.path) || 0) + 1)

  // unique visitors per day
  const day = new Date(data.timestamp).toISOString().split("T")[0]
  if (!analyticsData.dailyVisitors.has(day)) analyticsData.dailyVisitors.set(day, new Set())
  analyticsData.dailyVisitors.get(day)!.add(data.visitorId)
}

export function getAnalyticsSummary() {
  const sections = ["", "about", "skills", "projects", "experience", "education", "contact"]

  return {
    totalViews: analyticsData.totalViews,
    sectionViews: sections.map((s) => {
      const path = s ? `/${s}` : "/"
      return { path: s || "home", views: analyticsData.pathViews.get(path) || 0 }
    }),
    dailyVisitors: Array.from(analyticsData.dailyVisitors.entries()).map(([day, set]) => ({
      day,
      count: set.size,
    })),
  }
}
