import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, Users, Clock, AlertCircle } from "lucide-react"

const stats = [
  {
    title: "Total Books",
    value: "2,345",
    icon: Book,
    description: "Books in library",
  },
  {
    title: "Active Users",
    value: "1,234",
    icon: Users,
    description: "Registered members",
  },
  {
    title: "Pending Requests",
    value: "23",
    icon: Clock,
    description: "Awaiting approval",
  },
  {
    title: "Overdue Loans",
    value: "12",
    icon: AlertCircle,
    description: "Need attention",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}