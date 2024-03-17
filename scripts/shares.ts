import fs from 'node:fs/promises'
import { basename, dirname } from 'node:path'
import fg from 'fast-glob'

const packages = (
  await fg('./src/*/package.json', {
    onlyFiles: true,
  })
).sort()

export const context = await Promise.all(
  packages.map(async (path) => {
    const root = dirname(path)
    const dir = basename(root)

    const json = JSON.parse(await fs.readFile(path, 'utf-8'))
    const name = json.name

    // dir like `2024-01-01`
    const year = dir.split('-')[0]

    return {
      base: `/${year}/${name}/`,
      dir,
      root,
    }
  }),
)
