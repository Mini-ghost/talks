import config from '@slidev/client/uno.config.ts'
import { mergeConfigs, presetWebFonts } from 'unocss'

export default mergeConfigs([
  config,
  {
    shortcuts: {
      'text-gradient': 'inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500',
    },
    presets: [
      presetWebFonts({
        fonts: {
          sans: ['Inter', 'Noto Sans TC'],
        },
      }),
    ],
  },
])