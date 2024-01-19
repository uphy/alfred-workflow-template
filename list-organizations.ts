#!/usr/bin/env -S deno run -A --ext=ts

import { exit } from "./alfred.ts";

const organizations = JSON.parse(Deno.env.get("GRAFANA_ORG_SETTINGS")!);

exit(
  0,
  organizations.map((org: any) => {
    return {
      title: org.name,
      arg: JSON.stringify(org),
    };
  })
);
