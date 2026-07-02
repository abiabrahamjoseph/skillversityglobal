import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from './src/payload.config'

async function run() {
  const payload = await getPayload({ config: configPromise })
  
  const collections = ['pages', 'posts', 'programs', 'testimonials', 'categories', 'users']
  for (const col of collections) {
    const res = await payload.find({
      collection: col as any,
      limit: 0,
    })
    console.log(`Collection "${col}": ${res.totalDocs} documents`)
  }
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
