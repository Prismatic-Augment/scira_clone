// https://env.t3.gg/docs/nextjs#create-your-schema
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const clientEnv = createEnv({
  client: {
    // All client-side features are optional
    NEXT_PUBLIC_MAPBOX_TOKEN: z.string().optional().or(z.literal('')),
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().optional().or(z.literal('')),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().optional().or(z.literal('')),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().optional().or(z.literal(''))
  },
  runtimeEnv: {
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '',
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '',
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? ''
  }
})

