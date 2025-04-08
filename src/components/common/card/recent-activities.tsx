"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookRecentActivitiesEnum } from "@/enums/book.enum";
import { IRecentActivity } from "@/providers/http/books/interface";

interface RecentActivitiesCardProps {
  activities: IRecentActivity[];
}

export function RecentActivitiesCard({ activities }: RecentActivitiesCardProps) {
  // Function to determine the indicator color based on activity type
  const getIndicatorColor = (type: IRecentActivity["type"]) => {
    switch (type) {
      case BookRecentActivitiesEnum.BORROWED:
        return "bg-sky-700";
      case BookRecentActivitiesEnum.RETURNED:
        return "bg-green-700";
      case BookRecentActivitiesEnum.REGISTERED:
        return "bg-red-700";
      default:
        return "bg-gray-700";
    }
  };

  return (
    <Card className="w-full max-w-md shadow-md">
      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-bold">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className={`w-1 h-full min-h-[40px] ${getIndicatorColor(activity.type)} rounded-full`} />
            <div className="flex-1 mt-1">
              <p className="text-gray-700 dark:text-gray-300">{activity.type == BookRecentActivitiesEnum.BORROWED || activity.type == 
              BookRecentActivitiesEnum.RETURNED ? `Book ${activity.type.toLowerCase()}` : "New member registered"}: {activity.title ?? "Data not available"}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}