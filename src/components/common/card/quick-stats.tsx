"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type QuickStats = {
  id: string;
  title: string;
  type: "borrowed" | "available" | "total";
  value: number;
};

interface QuickStatsCardProps {
  quickStats: QuickStats[];
}

export function QuickStatsCard({ quickStats }: QuickStatsCardProps) {
  // Function to determine the indicator color based on quickStat type
  const getIndicatorColor = (type: QuickStats["type"]) => {
    switch (type) {
      case "total":
        return "text-blue-700";
        case "available":
          return "text-green-700";
        case "borrowed":
          return "text-red-700";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="w-full max-w-md shadow-md">
      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-bold">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {quickStats.map((quickStat) => (
          <div key={quickStat.id} className="flex flex-col space-x-4">
            <div className="flex justify-between items-start">
              <p className="text-gray-700 dark:text-gray-300">{quickStat.title}</p>
              <p className={`text-lg font-medium ${getIndicatorColor(quickStat.type)}`}>{quickStat.value}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}