import { apiFetch } from "./client";
import type { components, paths } from "./schema";


export const LINKS_QUERY_KEY = ["links"] as const;


export type CreateLinkBody =
  paths["/links"]["post"]["requestBody"]["content"]["application/json"];


export type Link = components["schemas"]["LinkResponseDto"];


export interface LinkRow extends Link {
  clickCount?: number;
}

export async function createLink(url: string): Promise<Link> {
  const body: CreateLinkBody = { url };
  return apiFetch<Link>("/links", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function getLinks(): Promise<LinkRow[]> {
  return apiFetch<LinkRow[]>("/links");
}
