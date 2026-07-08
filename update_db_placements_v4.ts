import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from './src/payload.config'
import fs from 'fs'
import path from 'path'

const students = [
  { filename: 'vishnu-1.png', alt: 'Vishnu', firstName: 'Vishnu', caption: 'Vishnu · Logistics & Supply · DHL' },
  { filename: 'vinayan-1.png', alt: 'Vinayan T V', firstName: 'Vinayan T V', caption: 'Vinayan T V · Logistics · Maersk' },
  { filename: 'anagha-1.png', alt: 'Anagha Ratheesh', firstName: 'Anagha Ratheesh', caption: 'Anagha Ratheesh · Oil & Gas · Gulf Inspector' },
  { filename: 'ebin-joy-1.png', alt: 'Ebin Joy', firstName: 'Ebin Joy', caption: 'Ebin Joy · HR Management · Lulu Group' },
  { filename: 'sabith.png', alt: 'Muhammed Sabith P N', firstName: 'Muhammed Sabith P N', caption: 'Muhammed Sabith P N · Logistics · Palakkad' }
]

async function run() {
  const payload = await getPayload({ config: configPromise })
  
  // Register all 5 files in the Payload media collection
  const newPlacements = []
  
  for (const student of students) {
    // Check if filename already exists
    const existing = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: student.filename
        }
      }
    })
    
    let mediaId
    if (existing.docs.length > 0) {
      mediaId = existing.docs[0].id
      console.log(`Found existing media for ${student.filename} with ID: ${mediaId}`)
    } else {
      const filePath = path.resolve(`./public/media/${student.filename}`)
      if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`)
        process.exit(1)
      }
      const fileBuffer = fs.readFileSync(filePath)
      
      console.log(`Registering ${student.filename} in Payload media collection...`)
      const mediaDoc = await payload.create({
        collection: 'media',
        data: {
          alt: student.alt,
        },
        file: {
          data: fileBuffer,
          name: student.filename,
          size: fileBuffer.length,
          mimetype: 'image/png',
        }
      })
      mediaId = mediaDoc.id
      console.log(`Registered ${student.filename} with ID: ${mediaId}`)
    }
    
    newPlacements.push({
      image: mediaId,
      firstName: student.firstName,
      caption: student.caption
    })
  }
  
  // Update site settings placementsGallery
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      placementsGallery: newPlacements
    },
    context: {
      disableRevalidate: true
    }
  })
  
  console.log('Successfully updated site-settings with all 5 PNG posters in database!')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
