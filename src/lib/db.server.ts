// Minimal local D1 typing (rather than the full @cloudflare/workers-types
// package) so we don't pull ambient Workers globals over the whole program —
// those redefine Request/Response/fetch in ways that conflict with the DOM
// lib types the rest of the (browser-facing) app relies on.
interface D1Result<T = Record<string, unknown>> {
  results: T[];
  success: boolean;
}
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<D1Result>;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
}
interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

interface CloudflareRuntime {
  env: {
    DB?: D1Database;
    ADMIN_PASSWORD?: string;
  };
}

export function getCloudflareEnv(request: Request): CloudflareRuntime["env"] {
  const runtime = (request as Request & { runtime?: { cloudflare?: CloudflareRuntime } }).runtime;
  const env = runtime?.cloudflare?.env;
  if (!env) {
    throw new Error("Cloudflare bindings unavailable on this request");
  }
  return env;
}
