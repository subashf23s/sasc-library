import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Clock, Star, CheckCircle } from 'lucide-react'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardOverview,
})

function DashboardOverview() {
  const stats = [
    { label: 'Books Borrowed', value: '3', icon: BookOpen, color: 'text-blue-500' },
    { label: 'Due Soon', value: '1', icon: Clock, color: 'text-amber-500' },
    { label: 'Favorites', value: '7', icon: Star, color: 'text-yellow-500' },
    { label: 'Returned', value: '12', icon: CheckCircle, color: 'text-green-500' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Your library activity at a glance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Borrowed', book: 'The Great Gatsby', date: 'Feb 8, 2026' },
                { action: 'Returned', book: 'Atomic Habits', date: 'Feb 5, 2026' },
                { action: 'Reserved', book: 'Dune', date: 'Feb 3, 2026' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-sm">{item.book}</p>
                    <p className="text-xs text-muted-foreground">{item.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Due Dates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { book: 'The Great Gatsby', due: 'Feb 22, 2026', daysLeft: 12 },
                { book: 'Project Hail Mary', due: 'Feb 15, 2026', daysLeft: 5 },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-sm">{item.book}</p>
                    <p className="text-xs text-muted-foreground">Due: {item.due}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    item.daysLeft <= 5 
                      ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                      : 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
                  }`}>
                    {item.daysLeft} days left
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
