"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Activity = {
  id: string;
  type: "borrowed" | "returned" | "registered";
  title: string;
  timestamp: string;
};

interface RecentActivitiesCardProps {
  activities: Activity[];
}

export function RecentActivitiesCard({ activities }: RecentActivitiesCardProps) {
  // Function to determine the indicator color based on activity type
  const getIndicatorColor = (type: Activity["type"]) => {
    switch (type) {
      case "borrowed":
        return "bg-blue-500";
      case "returned":
        return "bg-green-500";
      case "registered":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="w-full max-w-md shadow-md">
      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-bold">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className={`w-1 h-full min-h-[40px] ${getIndicatorColor(activity.type)} rounded-full`} />
            <div className="flex-1">
              <p className="text-gray-700 dark:text-gray-300">{activity.type == "borrowed" || activity.type == 
                "returned" ? `Book ${activity.type}` : "New member registered"}: "{activity.title}"</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}