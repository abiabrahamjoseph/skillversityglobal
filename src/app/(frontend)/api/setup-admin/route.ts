import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })

    const existingUsers = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'admin@skillversityglobal.com',
        },
      },
    })

    if (existingUsers.docs.length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Admin user already exists!',
        email: 'admin@skillversityglobal.com',
        loginUrl: 'https://skillversityglobal.vercel.app/admin/login',
      })
    }

    const newAdmin = await payload.create({
      collection: 'users',
      data: {
        name: 'Skillversity Admin',
        email: 'admin@skillversityglobal.com',
        password: 'skillversity2026',
        role: 'admin',
      } as any,
    })

    return NextResponse.json({
      success: true,
      message: 'Admin account created successfully in Neon Postgres database!',
      credentials: {
        email: 'admin@skillversityglobal.com',
        password: 'skillversity2026',
      },
      loginUrl: 'https://skillversityglobal.vercel.app/admin/login',
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to setup admin user' },
      { status: 500 }
    )
  }
}
