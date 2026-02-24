"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
  const allCookies = await cookies();

  // In development (HTTP) NextAuth uses this cookie name.
  const devToken = allCookies.get("next-auth.session-token")?.value;

  // In production over HTTPS (e.g. Vercel) NextAuth uses this cookie name.
  const prodToken = allCookies.get("__Secure-next-auth.session-token")?.value;

  const decodeToken = devToken || prodToken;

  if (!decodeToken) return null;

  const token = await decode({
    token: decodeToken,
    // Use the same secret that NextAuth uses
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return token?.token;
}