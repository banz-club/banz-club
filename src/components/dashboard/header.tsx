interface HeaderProps {
  timeLeft: number;
  isUpdating: boolean;
  onClear: () => void;
}

export function Header({ timeLeft, isUpdating, onClear }: HeaderProps) {
  return (
    <div className="flex items-center justify-between shrink-0">
      <h1 className="text-2xl font-bold">Hypixel Ban Statistics</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={onClear}
          className="text-xs px-2 py-1 rounded bg-destructive text-destructive-foreground hover:bg-destructive/90"
        >
          Clear Data
        </button>
        <div className="text-sm text-muted-foreground">
          Next update in: {(timeLeft / 1000).toFixed(1)}s
          {isUpdating && " (Updating...)"}
        </div>
      </div>
    </div>
  );
}
