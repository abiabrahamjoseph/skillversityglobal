import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Programs } from './collections/Programs'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { SiteSettings } from './globals/SiteSettings'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { canRunJobs } from './access/roles'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const rawDbUrl =
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.DATABASE_URL ||
  process.env.DATABASE_URI ||
  'postgresql://neondb_owner:npg_HnMAX38ISrmq@ep-lingering-wildflower-avincw96-pooler.c-11.us-east-1.aws.neon.tech/neondb?sslmode=require'

const isPostgres =
  Boolean(rawDbUrl) &&
  (rawDbUrl.startsWith('postgres') ||
    rawDbUrl.startsWith('postgresql') ||
    rawDbUrl.includes('neon.tech') ||
    rawDbUrl.includes('supabase') ||
    rawDbUrl.includes('vercel-storage') ||
    rawDbUrl.includes('postgres'))

const databaseUrl = rawDbUrl || (process.env.VERCEL ? 'file:/tmp/payload.db' : 'file:./payload.db')

const serverUrl = getServerSideURL()
const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null
const allowedOrigins = Array.from(
  new Set([
    serverUrl,
    vercelUrl,
    vercelProductionUrl,
    'https://skillversityglobal.vercel.app',
    'http://localhost:3000',
  ].filter(Boolean) as string[])
)

export default buildConfig({
  serverURL: allowedOrigins[0] || 'https://skillversityglobal.vercel.app',
  admin: {
    meta: {
      titleSuffix: '— Skillversity Admin',
      icons: [
        {
          url: '/favicon.ico',
        },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    avatar: 'default',
    theme: 'all',
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: (isPostgres || Boolean(process.env.VERCEL))
    ? postgresAdapter({
        pool: {
          connectionString:
            process.env.POSTGRES_URL_NON_POOLING ||
            process.env.POSTGRES_URL ||
            process.env.DATABASE_URL ||
            process.env.DATABASE_URI ||
            (rawDbUrl ? rawDbUrl : 'postgres://postgres:postgres@localhost:5432/skillversity'),
          ssl:
            rawDbUrl && (rawDbUrl.includes('neon.tech') || rawDbUrl.includes('supabase') || rawDbUrl.includes('postgres'))
              ? { rejectUnauthorized: false }
              : false,
        },
        push: true,
        migrationDir: path.resolve(dirname, 'migrations'),
      })
    : require('@payloadcms/db-sqlite').sqliteAdapter({
        client: {
          url: databaseUrl,
        },
        push: true,
        migrationDir: path.resolve(dirname, 'migrations'),
      }),
  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    Programs,
    Testimonials,
  ],
  cors: allowedOrigins,
  csrf: allowedOrigins,
  globals: [Header, Footer, SiteSettings],
  plugins,
  secret: process.env.PAYLOAD_SECRET || '7ca71a6e9a65d75cb98e4f1a6039542df98c3e80b2a75cd9df4e91a0c8b672b1',
  ...(process.env.VERCEL ? {} : { sharp }),
  ...(process.env.SMTP_HOST
    ? {
        email: nodemailerAdapter({
          defaultFromAddress: process.env.SMTP_FROM || 'noreply@skillversityglobal.com',
          defaultFromName: 'Skillversity Global',
          transportOptions: {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          },
        }),
      }
    : {}),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => canRunJobs({ req }),
    },
    tasks: [],
  },
})
