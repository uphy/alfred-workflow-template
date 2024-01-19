#!/usr/bin/env -S deno run -A --ext=ts

import { exit } from "./alfred.ts";

exit(
  0,
  [{
    title: "Test",
    subtitle: "This is a test",
    arg: "test"
  }]
);
