import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { HistoryEntry } from "@/interfaces/bans";
import { format } from "date-fns";
import { Shield, User } from "lucide-react";

interface ActivityLogProps {
  data: HistoryEntry[];
}

export function ActivityLog({ data }: ActivityLogProps) {
  return (
    <Card className="h-[400px] overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Activity Log</h2>
      </div>

      <ScrollArea className="h-[344px]">
        <div className="p-4 space-y-2">
          {data.map((entry) => (
            <div key={entry.timestamp} className="space-y-1">
              {entry.watchdog_bans > 0 && (
                <div className="text-sm flex items-center gap-2">
                  <span className="font-medium text-muted-foreground">
                    {format(entry.timestamp, "HH:mm:ss")}
                  </span>
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-primary">
                    Watchdog banned {entry.watchdog_bans}
                  </span>
                </div>
              )}
              {entry.staff_bans > 0 && (
                <div className="text-sm flex items-center gap-2">
                  <span className="font-medium text-muted-foreground">
                    {format(entry.timestamp, "HH:mm:ss")}
                  </span>
                  <User className="w-4 h-4 text-destructive" />
                  <span className="text-destructive">
                    Staff banned {entry.staff_bans}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
