import fs from 'node:fs/promises'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import prompts from 'prompts'
import { execa } from 'execa'

const args = process.argv.slice(2)

const folders = (
  await fs.readdir(new URL('../src', import.meta.url), {
    withFileTypes: true,
  })
)
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)
  .sort((a, b) => -a.localeCompare(b))

const result = await prompts([
  {
    type: 'select',
    name: 'folder',
    message: 'Pick a folder',
    choices: folders.map(folder => ({ title: folder, value: folder })),
  },
])

if (result.folder) {
  if (args[0] === 'dev') {
    execa('code', [
      fileURLToPath(
        new URL(`../src/${result.folder}/slides.md`, import.meta.url),
      ),
    ])
  }
  await execa('pnpm', ['run', ...args], {
    cwd: new URL(`../src/${result.folder}`, import.meta.url),
    stdio: 'inherit',
  })
}
