import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("terms", "routes/terms.tsx"),
  route("api/contact", "routes/api.contact.ts"),
  route("*", "routes/catchall.ts"),
] satisfies RouteConfig;
