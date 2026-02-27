import { apiFetch } from "./client";
import type { components } from "./schema"

export type User = components["schemas"]["UserDto"]

export async function getMe(): Promise<User | null> {
  try {
    return await apiFetch<User>("/auth/me");
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  await apiFetch<void>("/auth/logout", { method: "POST" });
}
