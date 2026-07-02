import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Skillversity Global` : 'Skillversity Global | India\'s First Job-Ready Campus'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  if (!doc?.slug) return url

  if ('content' in doc) {
    return `${url}/blog/${doc.slug}`
  }

  return doc.slug === 'home' ? url : `${url}/${doc.slug}`
}

const blobReadWriteToken = process.env.BLOB_READ_WRITE_TOKEN

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
    formSubmissionOverrides: {
      hooks: {
        afterChange: [
          async ({ doc, req, operation }) => {
            if (operation === 'create') {
              const receiverEmail = process.env.LEAD_RECEIVER_EMAIL || 'abiabrahamj@gmail.com'
              const smtpFrom = process.env.SMTP_FROM || 'noreply@skillversityglobal.com'
              
              const data = doc.submissionData || []
              
              let tableRows = ''
              for (const item of data) {
                tableRows += `<tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; text-transform: capitalize;">${item.field}</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${item.value}</td>
                </tr>`
              }
              
              const htmlContent = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
                  <h2 style="color: #0A007A; border-bottom: 2px solid #0A007A; padding-bottom: 10px; margin-top: 0;">New Student Lead - Skillversity Global</h2>
                  <p>A student has filled out the counselling enquiry form on the website. Here are the details:</p>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <thead>
                      <tr style="background-color: #f2f2f2;">
                        <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Field</th>
                        <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${tableRows}
                    </tbody>
                  </table>
                  <p style="margin-top: 20px; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 10px; text-align: right;">
                    Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)
                  </p>
                </div>
              `
              
              try {
                await req.payload.sendEmail({
                  to: receiverEmail,
                  from: smtpFrom,
                  subject: 'New Lead Submission - Skillversity Global',
                  html: htmlContent,
                })
              } catch (err: any) {
                req.payload.logger.error(`Failed to send lead email notification: ${err.message}`)
              }
            }
          }
        ]
      }
    }
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  // Register the plugin in every environment so Payload's import map always
  // includes the Vercel Blob admin upload handler when production enables it.
  vercelBlobStorage({
    collections: {
      media: true,
    },
    enabled: Boolean(blobReadWriteToken),
    token: blobReadWriteToken,
    // Upload directly from the browser to Vercel Blob, bypassing the serverless
    // function. Avoids Vercel's 4.5MB request-body limit and server-side upload
    // failures (POST /api/media 500). Recommended setup for Payload on Vercel.
    clientUploads: true,
    // Give every uploaded blob a unique suffix so re-uploads or same-named files
    // never collide ("This blob already exists" — new @vercel/blob won't overwrite).
    addRandomSuffix: true,
  }),
]
