import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { env } from "~/env";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : ({ path, error }) => {
            // Log errors in production too for debugging Netlify issues
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          },
    // Add response headers to help with HTTP/2 issues on Netlify
    responseMeta() {
      return {
        headers: {
          "Cache-Control": "no-store",
          "Connection": "close",
          // Help prevent HTTP/2 issues
          "Keep-Alive": "timeout=5, max=1000",
        },
      };
    },
  });

export { handler as GET, handler as POST };

// Export runtime config for Netlify Functions
export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes max for AI operations
