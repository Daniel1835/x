import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface AvailabilityItem {
  date: string;
  isBooked: boolean;
}

interface AvailabilityCalendarProps {
  availability?: AvailabilityItem[];
}

export function AvailabilityCalendar({ availability }: AvailabilityCalendarProps) {
  if (!availability || availability.length === 0) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Kalender Ketersediaan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {availability.map((item) => {
            const date = new Date(item.date);
            const day = date.toLocaleDateString("id-ID", { weekday: "short" });
            const dateNum = date.getDate();

            return (
              <div
                key={item.date}
                className={`p-3 rounded-lg text-center transition-all ${
                  item.isBooked
                    ? "bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700"
                    : "bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700"
                }`}
                data-testid={`calendar-item-${item.date}`}
              >
                <div className="text-xs font-medium text-muted-foreground uppercase">{day}</div>
                <div className={`text-sm font-bold ${item.isBooked ? "text-red-700 dark:text-red-300" : "text-green-700 dark:text-green-300"}`}>
                  {dateNum}
                </div>
                <div className="text-xs font-semibold mt-1">
                  {item.isBooked ? "Booked" : "Available"}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
