import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const adminUser = process.env.ADMIN_USER;
const adminPassword = process.env.ADMIN_PASSWORD;
const nextAuthSecret = process.env.NEXTAUTH_SECRET;

const failedAttempts = new Map<string, { count: number; blockedUntil: number }>();
const MAX_ATTEMPTS = 5;
const BLOCK_DURATION_MS = 15 * 60 * 1000;

function isBlocked(key: string): boolean {
  const entry = failedAttempts.get(key);
  if (!entry) return false;
  if (entry.blockedUntil <= Date.now()) {
    failedAttempts.delete(key);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(key: string) {
  const entry = failedAttempts.get(key) ?? { count: 0, blockedUntil: 0 };
  entry.count += 1;
  if (entry.count >= MAX_ATTEMPTS) entry.blockedUntil = Date.now() + BLOCK_DURATION_MS;
  failedAttempts.set(key, entry);
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials, request) {
        const forwardedFor = request?.headers?.get("x-forwarded-for");
        const clientIp = forwardedFor?.split(",")[0]?.trim() || "unknown";
        const attemptKey = `${clientIp}:${credentials?.username || "unknown"}`;

        if (isBlocked(attemptKey)) return null;

        if (!adminUser || !adminPassword) {
          return null;
        }

        if (
          credentials?.username === adminUser &&
          credentials?.password === adminPassword
        ) {
          failedAttempts.delete(attemptKey);
          return { id: "admin", name: "Administrador" };
        }

        recordFailedAttempt(attemptKey);
        return null;
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: nextAuthSecret,
};
