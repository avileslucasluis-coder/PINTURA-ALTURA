import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const localHosts = new Set(["localhost", "127.0.0.1", "[::1]"]);

export function proxy(request: NextRequest) {
  const host = request.nextUrl.hostname;
  const path = request.nextUrl.pathname.toLowerCase();
  const method = request.method.toUpperCase();
  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";
  const contentLength = Number(request.headers.get("content-length") || 0);

  const blockedPath = /\.\.(?:\/|\\)|wp-admin|wp-login|xmlrpc\.php|\.env|\/etc\/passwd|phpmyadmin/.test(path);
  const blockedUserAgent = /sqlmap|nikto|nessus|masscan|nmap|zgrab/.test(userAgent);
  const blockedMethod = !["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"].includes(method);

  if (blockedPath || blockedUserAgent || blockedMethod || contentLength > 30 * 1024 * 1024) {
    return new NextResponse("Solicitud bloqueada", { status: 403 });
  }

  const forwardedProtocol = request.headers.get("x-forwarded-proto");
  const protocol = forwardedProtocol?.split(",")[0]?.trim() || request.nextUrl.protocol.replace(":", "");

  if (protocol === "http" && !localHosts.has(host)) {
    const httpsUrl = request.nextUrl.clone();
    httpsUrl.protocol = "https:";
    return NextResponse.redirect(httpsUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};