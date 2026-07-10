import { getCookie } from "@tanstack/react-start/server";
import { getCloudflareEnv } from "@/lib/db.server";

export const ADMIN_COOKIE = "luma_admin";

export function isAdminAuthenticated(request: Request): boolean {
  const env = getCloudflareEnv(request);
  if (!env.ADMIN_PASSWORD) return false;
  const cookie = getCookie(ADMIN_COOKIE);
  return typeof cookie === "string" && cookie === env.ADMIN_PASSWORD;
}
