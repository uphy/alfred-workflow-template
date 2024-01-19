#!/usr/bin/env -S deno run -A --ext=ts

import { exit } from "./alfred.ts";

const setting = JSON.parse(Deno.args[0]);
const limit = setting["limit"] ?? 1000;
const baseUrl = setting["base-url"] ?? "https://grafana.com";
const org = setting["id"]!;
const token = setting["token"]!;
const defaults = setting["defaults"] ?? {};

// convert defaults object as query string
const defaultsQuery = Object.keys(defaults)
  .map((key) => `${key}=${defaults[key]}`)
  .join("&");

const dashboards = await fetch(
  `${baseUrl}/api/search?orgId=${org}&limit=${limit}`,
  {
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  }
);
const dashboardsJson = await dashboards.json();
if (dashboards.status !== 200) {
  exit(1, [
    {
      title: "failed to fetch dashboards",
      subtitle: dashboardsJson.message,
    },
  ]);
}

exit(
  0,
  dashboardsJson.map((dashboard: any) => {
    let url = `${baseUrl}${dashboard.url}?orgId=${org}`;
    if (defaultsQuery) {
      url += `&${defaultsQuery}`;
    }
    return {
      title: dashboard.title,
      subtitle: dashboard.folderTitle,
      arg: url,
    };
  })
);
