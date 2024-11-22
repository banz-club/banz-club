import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_POLL_INTERVAL: z.coerce.number().default(60000),
    NEXT_PUBLIC_ENABLE_UMAMI: z.string().default("false"),
  },
  runtimeEnv: {
    NEXT_PUBLIC_POLL_INTERVAL: process.env.NEXT_PUBLIC_POLL_INTERVAL,
    NEXT_PUBLIC_ENABLE_UMAMI: process.env.NEXT_PUBLIC_ENABLE_UMAMI,
  },
});
