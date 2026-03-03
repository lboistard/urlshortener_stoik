import { apiFetch } from "./client";
import type { components } from "./schema";

type User = components["schemas"]["UserDto"];

const getMe = async (): Promise<User | null> => {
	try {
		return await apiFetch<User>("/auth/me");
	} catch {
		return null;
	}
};

const logout = async (): Promise<void> => {
	await apiFetch<void>("/auth/logout", { method: "POST" });
};

export { getMe, logout };
export type { User };
