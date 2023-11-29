const path = require('path')
require('next')
const { startServer } = require('next/dist/server/lib/start-server')

process.env.NODE_ENV = 'production'

const dir = path.join(__dirname)
process.chdir(dir)

const port = parseInt(process.env.PORT, 10) || 8000
const hostname = process.env.HOSTNAME || '0.0.0.0'

// Make sure commands gracefully respect termination signals (e.g. from Docker)
// Allow the graceful termination to be manually configurable
if (!process.env.NEXT_MANUAL_SIG_HANDLE) {
  process.on('SIGTERM', () => process.exit(0))
  process.on('SIGINT', () => process.exit(0))
}

let keepAliveTimeout = parseInt(process.env.KEEP_ALIVE_TIMEOUT, 10);
if (
  Number.isNaN(keepAliveTimeout) ||
  !Number.isFinite(keepAliveTimeout) ||
  keepAliveTimeout < 0
) {
  keepAliveTimeout = undefined
}

startServer({
  dir,
  hostname,
  port,
  keepAliveTimeout,
  isDev: false,
  allowRetry: false,
  useWorkers: true,
}).catch((err) => {
  console.error(err);
  process.exit(1);
});