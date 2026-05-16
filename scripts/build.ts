import { join } from 'node:path'
import { execa } from 'execa'
import { context } from './shares'

const CONCURRENCY = 2
const queue = [...context]

async function worker() {
  while (queue.length) {
    const { root, base } = queue.shift()!
    const out = join('../../dist', base)
    await execa('pnpm', ['build', '--base', base, '--out', out], {
      cwd: new URL(`../${root}`, import.meta.url),
      stdio: 'inherit',
    })
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker))