import type { Express } from 'express'
import fs from 'node:fs'
import path from 'node:path'
import morgan from 'morgan'

export function addMorganMiddlewares(app: Express) {
  const isProduction = process.env.NODE_ENV === 'production'

  if (isProduction) {
    // Use logs directory (should be created by Docker with proper permissions)
    const logsDir = path.join(process.cwd(), 'logs')
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true })
    }

    // Create write streams for access and error logs
    const accessLogStream = fs.createWriteStream(
      path.join(logsDir, 'access.log'),
      { flags: 'a' },
    )

    const errorLogStream = fs.createWriteStream(
      path.join(logsDir, 'error.log'),
      { flags: 'a' },
    )

    // Custom format for production logs
    const productionFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'

    // Log all requests to access.log
    app.use(morgan(productionFormat, {
      stream: accessLogStream,
      skip: (req, res) => res.statusCode >= 400, // Skip error requests for access log
    }))

    // Log only error requests to error.log
    app.use(morgan(productionFormat, {
      stream: errorLogStream,
      skip: (req, res) => res.statusCode < 400, // Only log error requests
    }))

    // Also log errors to console for immediate visibility
    app.use(morgan('combined', {
      skip: (req, res) => res.statusCode < 400,
    }))
  }
  else {
    // Development logging
    app.use(morgan('dev'))
  }
}
