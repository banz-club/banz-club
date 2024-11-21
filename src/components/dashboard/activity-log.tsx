import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Bot, Shield } from "lucide-react";
import type { HistoryEntry } from "@/interfaces/bans";

interface ActivityLogProps {
  data: HistoryEntry[];
}

export function ActivityLog({ data }: ActivityLogProps) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="p-4 pb-0 shrink-0">
        <h2 className="text-lg font-semibold">Ban Activity</h2>
        <Separator className="my-2" />
      </div>
      <ScrollArea className="flex-1 px-4">
        {data.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-8">
            Waiting for activity data...
          </div>
        ) : (
          data.map((entry) =>
            entry.watchdog_bans > 0 || entry.staff_bans > 0 ? (
              <div key={entry.timestamp} className="mb-2 text-sm">
                <div className="grid gap-2">
                  {entry.watchdog_bans > 0 && (
                    <div className="flex items-center gap-2 p-2 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors">
                      <Bot className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-xs text-muted-foreground">
                        {new Date(entry.timestamp).toLocaleTimeString()}
                      </span>
                      <span className="grow">
                        Watchdog banned{" "}
                        <span className="font-medium text-primary">
                          {entry.watchdog_bans.toLocaleString()}
                        </span>{" "}
                        players
                      </span>
                    </div>
                  )}
                  {entry.staff_bans > 0 && (
                    <div className="flex items-center gap-2 p-2 rounded-md bg-destructive/10 hover:bg-destructive/20 transition-colors">
                      <Shield className="h-4 w-4 text-destructive shrink-0" />
                      <span className="text-xs text-muted-foreground">
                        {new Date(entry.timestamp).toLocaleTimeString()}
                      </span>
                      <span className="grow">
                        Staff banned{" "}
                        <span className="font-medium text-destructive">
                          {entry.staff_bans.toLocaleString()}
                        </span>{" "}
                        players
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : null
          )
        )}
      </ScrollArea>
    </Card>
  );
}
