"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Eye, BarChart2, Activity } from "lucide-react"

type AnalyticsData = Awaited<ReturnType<typeof fetchAnalytics>>

async function fetchAnalytics() {
  const res = await fetch("/api/analytics", { next: { revalidate: 0 } })
  if (!res.ok) throw new Error("Failed to fetch analytics")
  return (await res.json()) as {
    totalViews: number
    sectionViews: { path: string; views: number }[]
    dailyVisitors: { day: string; count: number }[]
  }
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        setData(await fetchAnalytics())
      } finally {
        setLoading(false)
      }
    }
    load()
    const id = setInterval(load, 60_000)
    return () => clearInterval(id)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    )
  }

  if (!data) return null
  /* ---------- unchanged JSX below (only variable name switched to `data`) ---------- */
  const mostViewed = [...data.sectionViews].sort((a, b) => b.views - a.views)[0]?.path ?? "N/A"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Portfolio Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="visitors">Visitors</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* total views */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                      <h3 className="text-2xl font-bold">{data.totalViews}</h3>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Eye className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* most viewed */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Most Viewed</p>
                      <h3 className="text-2xl font-bold">{mostViewed}</h3>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-full">
                      <BarChart2 className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* today's visitors */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Today's Visitors</p>
                      <h3 className="text-2xl font-bold">
                        {data.dailyVisitors[data.dailyVisitors.length - 1]?.count ?? 0}
                      </h3>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ----- sections bar chart ----- */}
          <TabsContent value="sections">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.sectionViews}>
                  <XAxis dataKey="path" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          {/* ----- daily visitors bar chart ----- */}
          <TabsContent value="visitors">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.dailyVisitors}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
