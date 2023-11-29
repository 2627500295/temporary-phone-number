import {
  startServer,
  StartServerOptions,
} from "next/dist/server/lib/start-server";
import * as path from "node:path";
import "next";

const port = parseInt(process.env.PORT!, 10) || 8000;
const hostname = process.env.HOSTNAME || "0.0.0.0";
const dir = path.join(__dirname);

process.chdir(dir);

if (!process.env.NEXT_MANUAL_SIG_HANDLE) {
  process.on("SIGTERM", () => process.exit(0));
  process.on("SIGINT", () => process.exit(0));
}

let keepAliveTimeout: number | undefined = parseInt(
  process.env.KEEP_ALIVE_TIMEOUT!,
  10
);

if (
  Number.isNaN(keepAliveTimeout) ||
  !Number.isFinite(keepAliveTimeout) ||
  keepAliveTimeout < 0
) {
  keepAliveTimeout = undefined;
}

startServer({
  dir,
  hostname,
  port,
  keepAliveTimeout,
  isDev: false,
  allowRetry: false,
  useWorkers: true,
} as StartServerOptions).catch((err) => {
  console.error(err);
  process.exit(1);
});
