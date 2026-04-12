import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
    crossOrigin: "anonymous",
    referrerPolicy: "no-referrer",
  },
  { rel: "icon", type: "image/svg+xml", href: "/assets/Logo.png" },
  { rel: "manifest", href: "/manifest.json" },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Vanguard — AI-Powered Antivirus" },
    {
      name: "description",
      content:
        "Next-gen antivirus built with AI — real-time threat detection, zero-day protection, and peace of mind for your devices.",
    },
    { name: "theme-color", content: "#0a0c0a" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { property: "og:title", content: "Vanguard — AI-Powered Antivirus" },
    { property: "og:description", content: "Next-gen antivirus built with AI" },
    { property: "og:type", content: "website" },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                var hash = window.location.hash;
                if (hash && hash.length > 0) {
                  try {
                    history.replaceState(null, '', window.location.pathname + window.location.search);
                  } catch(e) {}
                }
              }
            `,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-navigation">
          Skip to main content
        </a>

        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          id="announcements"
        ></div>

        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main
      id="main-content"
      role="main"
      className="container"
      style={{
        background: "var(--color-bg)",
        minHeight: "100vh",
        color: "var(--color-text)",
        paddingBlock: "4rem",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 700,
          marginBlockEnd: "1rem",
        }}
      >
        {message}
      </h1>
      <p
        style={{
          color: "var(--color-text-muted)",
          fontSize: "clamp(1rem, 2vw, 1.125rem)",
        }}
      >
        {details}
      </p>
      {stack && (
        <pre
          className="w-full p-4 overflow-x-auto"
          style={{
            background: "var(--color-bg-card)",
            borderRadius: "12px",
            marginBlockStart: "1rem",
            padding: "1rem",
            overflow: "auto",
            fontSize: "0.875rem",
          }}
        >
          <code>{stack}</code>
        </pre>
      )}
      <a
        href="/"
        className="btn btn-primary"
        style={{ marginBlockStart: "2rem", display: "inline-flex" }}
      >
        Return to Home
      </a>
    </main>
  );
}
