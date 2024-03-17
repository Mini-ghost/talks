import fs from 'node:fs/promises'
import { context } from './shares'

const redirects = context.map(({ base, dir }) => {
  return `
[[redirects]]
from = "${dir}"
to = "https://talks.mini-ghost.dev${base}"
status = 301

[[redirects]]
from = "${base}*"
to = "${base}index.html"
status = 200`
}).join('\n')

const content = `[build]
publish = "dist"
command = "pnpm run build"

[build.environment]
NODE_VERSION = "20"
PLAYWRIGHT_BROWSERS_PATH = "0"
${redirects}

[[redirects]]
from = "/"
to = "https://mini-ghost.dev/talks"
status = 302
`

await fs.writeFile('netlify.toml', content, 'utf-8')
