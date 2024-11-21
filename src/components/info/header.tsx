import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "next-view-transitions";

export function InfoHeader() {
  return (
    <header className="border-b">
      <div className="container py-4 pl-4 flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Information</h1>
      </div>
    </header>
  );
}
