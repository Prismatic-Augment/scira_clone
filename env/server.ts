// https://env.t3.gg/docs/nextjs#create-your-schema
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const serverEnv = createEnv({
  server: {
    // Required core services
    OPENAI_API_KEY: z.string().min(1),
    OPENAI_BASE_URL: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    DIRECT_URL: z.string().min(1),
    AUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().min(1),
    SUPABASE_URL: z.string().min(1),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
    
    // Optional AI services
    HELICONE_API_KEY: z.string().optional().or(z.literal('')),
    MISTRAL_API_KEY: z.string().optional().or(z.literal('')),
    COHERE_API_KEY: z.string().optional().or(z.literal('')),
    CEREBRAS_API_KEY: z.string().optional().or(z.literal('')),
    GROQ_API_KEY: z.string().optional().or(z.literal('')),
    
    // Optional integration services
    E2B_API_KEY: z.string().optional().or(z.literal('')),
    ELEVENLABS_API_KEY: z.string().optional().or(z.literal('')),
    TAVILY_API_KEY: z.string().optional().or(z.literal('')),
    EXA_API_KEY: z.string().optional().or(z.literal('')),
    TMDB_API_KEY: z.string().optional().or(z.literal('')),
    YT_ENDPOINT: z.string().optional().or(z.literal('')),
    FIRECRAWL_API_KEY: z.string().optional().or(z.literal('')),
    OPENWEATHER_API_KEY: z.string().optional().or(z.literal('')),
    SANDBOX_TEMPLATE_ID: z.string().optional().or(z.literal('')),
    
    // Maps and location services
    GOOGLE_MAPS_API_KEY: z.string().min(1),
    MAPBOX_ACCESS_TOKEN: z.string().min(1),
    TRIPADVISOR_API_KEY: z.string().min(1),
    AVIATION_STACK_API_KEY: z.string().optional().or(z.literal('')),
    
    // Optional storage and analytics
    BLOB_READ_WRITE_TOKEN: z.string().optional().or(z.literal('')),
    MEM0_API_KEY: z.string().optional().or(z.literal('')),
    MEM0_ORG_ID: z.string().optional().or(z.literal('')),
    MEM0_PROJECT_ID: z.string().optional().or(z.literal('')),
    
    // Authentication (Google OAuth)
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    CRON_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_MAPBOX_TOKEN: z.string().min(1),
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().optional().or(z.literal('')),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().optional().or(z.literal('')),
  },
  runtimeEnv: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_BASE_URL: process.env.OPENAI_BASE_URL,
    HELICONE_API_KEY: process.env.HELICONE_API_KEY ?? '',
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY ?? '',
    COHERE_API_KEY: process.env.COHERE_API_KEY ?? '',
    CEREBRAS_API_KEY: process.env.CEREBRAS_API_KEY ?? '',
    GROQ_API_KEY: process.env.GROQ_API_KEY ?? '',
    E2B_API_KEY: process.env.E2B_API_KEY ?? '',
    ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY ?? '',
    TAVILY_API_KEY: process.env.TAVILY_API_KEY ?? '',
    EXA_API_KEY: process.env.EXA_API_KEY ?? '',
    TMDB_API_KEY: process.env.TMDB_API_KEY ?? '',
    YT_ENDPOINT: process.env.YT_ENDPOINT ?? '',
    FIRECRAWL_API_KEY: process.env.FIRECRAWL_API_KEY ?? '',
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY ?? '',
    SANDBOX_TEMPLATE_ID: process.env.SANDBOX_TEMPLATE_ID ?? '',
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    TRIPADVISOR_API_KEY: process.env.TRIPADVISOR_API_KEY,
    AVIATION_STACK_API_KEY: process.env.AVIATION_STACK_API_KEY ?? '',
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN ?? '',
    MEM0_API_KEY: process.env.MEM0_API_KEY ?? '',
    MEM0_ORG_ID: process.env.MEM0_ORG_ID ?? '',
    MEM0_PROJECT_ID: process.env.MEM0_PROJECT_ID ?? '',
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    CRON_SECRET: process.env.CRON_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '',
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? '',
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
})
