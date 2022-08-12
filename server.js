const { initTracing } = require('./tracing')
const api = require('@opentelemetry/api')
const { createServer } = require("http")
const { parse } = require("url")
const next = require("next")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

initTracing()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    // const activeSpan = api.trace.getSpan(api.context.active())
    // activeSpan.addEvent('Hello API Called', { randomIndex: 1 })
    handle(req, res, parsedUrl)
  }).listen(3000, (err) => {
    if (err) throw err
    console.log("> Ready on http://localhost:3000")
  })
})