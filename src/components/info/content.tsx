import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { InfoHeader } from "@/components/info/header";
import { Features } from "@/components/info/features";
import { ClientSideInfo } from "@/components/info/client-side-info";

export function InfoContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <InfoHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">How It Works</h1>
            <ClientSideInfo />
            <Features />
            <div className="text-sm text-muted-foreground pt-4 border-t">
              Note: This is a demo application intended to showcase client-side
              state management and real-time updates using React and Zustand.
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
