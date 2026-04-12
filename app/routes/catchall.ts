import type { Route } from "./+types/catchall";

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  
  // Return a simple 404 for technical/infrastructure requests
  // to avoid triggering the full UI ErrorBoundary or logging hard errors
  return new Response("Not Found", {
    status: 404,
    statusText: "Not Found",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
