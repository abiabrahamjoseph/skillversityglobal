import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import sharp from 'sharp'
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

const databaseUrl = process.env.DATABASE_URL || 'file:./payload.db'
const isPostgres = databaseUrl.startsWith('postgres:') || databaseUrl.startsWith('postgresql:')

export default buildConfig({
  admin: {
    components: {
      beforeDashboard: ['@/components/BeforeDashboard#default'],
      beforeLogin: ['@/components/BeforeLogin#default'],
      graphics: {
        Icon: '@/components/admin/Icon#SkillversityIcon',
        Logo: '@/components/admin/Logo#SkillversityLogo',
      },
    },
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
  db: isPostgres
    ? postgresAdapter({
        pool: {
          connectionString: databaseUrl,
        },
        migrationDir: path.resolve(dirname, 'migrations-postgres'),
      })
    : sqliteAdapter({
        client: {
          url: databaseUrl,
        },
        migrationDir: path.resolve(dirname, 'migrations-sqlite'),
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
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, SiteSettings],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
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
