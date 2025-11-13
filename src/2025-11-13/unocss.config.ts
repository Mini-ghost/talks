import config from '@slidev/client/uno.config'
import { mergeConfigs, presetWebFonts } from 'unocss'

export default mergeConfigs([
  config,
  {
    presets: [
      presetWebFonts({
        fonts: {
          hand: 'Playwrite IT Moderna',
        },
      }),
    ],
  },
])