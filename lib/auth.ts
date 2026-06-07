import { cookies } from "next/headers";

const ADMIN_COOKIE = "admin_session";

export function isAdminAuthenticated(): boolean {
  const cookieStore = cookies();
  const session = cookieStore.get(ADMIN_COOKIE);
  const password = process.env.ADMIN_PASSWORD;
  if (!password || !session?.value) return false;
  return session.value === hashPassword(password);
}

export function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    hash = (hash << 5) - hash + password.charCodeAt(i);
    hash |= 0;
  }
  return `admin_${Math.abs(hash).toString(36)}`;
}

export function createAdminSessionValue(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return hashPassword(password);
}

export { ADMIN_COOKIE };
