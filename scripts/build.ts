import { execa } from 'execa'
import { context } from './shares'

const promises: Promise<any>[] = []

context.forEach(({ root, base }) => {
  const out = `../../dist/${base}`

  const args = ['build', '--base', base, '--out', out]
  const promise = execa('pnpm', args, {
    cwd: new URL(`../${root}`, import.meta.url),
    stdio: 'inherit',
  })

  promises.push(promise)
})

await Promise.all(promises)