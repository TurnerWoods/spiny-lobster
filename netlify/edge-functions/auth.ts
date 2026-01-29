import type { Context } from "https://edge.netlify.com";

export default async function handler(request: Request, context: Context) {
  // Get credentials from environment variables
  const SITE_PASSWORD = Deno.env.get("SITE_PASSWORD") || "staging123";
  const SITE_USERNAME = Deno.env.get("SITE_USERNAME") || "elevare";

  // Skip auth for static assets to improve performance
  const url = new URL(request.url);
  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf'];
  if (staticExtensions.some(ext => url.pathname.endsWith(ext))) {
    return context.next();
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");

    if (scheme === "Basic") {
      const decoded = atob(encoded);
      const [username, password] = decoded.split(":");

      if (username === SITE_USERNAME && password === SITE_PASSWORD) {
        return context.next();
      }
    }
  }

  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Elevare Health Staging", charset="UTF-8"',
    },
  });
}
