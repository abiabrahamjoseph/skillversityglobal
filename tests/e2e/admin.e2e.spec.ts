import { test, expect, Page } from '@playwright/test'
import net from 'node:net'
import { login } from '../helpers/login'
import { seedTestUser, cleanupTestUser, testUser } from '../helpers/seedUser'

test.describe('Admin Panel', () => {
  let page: Page
  let skipAdmin = false

  const canReachDatabase = async () => {
    if (!process.env.DATABASE_URL) return false

    const url = new URL(process.env.DATABASE_URL)
    const host = url.hostname
    const port = Number(url.port || 5432)

    return new Promise<boolean>((resolve) => {
      const socket = net.createConnection({ host, port, timeout: 1000 })
      socket.once('connect', () => {
        socket.end()
        resolve(true)
      })
      socket.once('timeout', () => {
        socket.destroy()
        resolve(false)
      })
      socket.once('error', () => {
        socket.destroy()
        resolve(false)
      })
    })
  }

  test.beforeAll(async ({ browser }) => {
    if (!(await canReachDatabase())) {
      skipAdmin = true
      return
    }

    await seedTestUser()

    const context = await browser.newContext()
    page = await context.newPage()

    await login({ page, user: testUser })
  })

  test.afterAll(async () => {
    if (skipAdmin) return
    await cleanupTestUser()
  })

  test.beforeEach(() => {
    test.skip(skipAdmin, 'Database is not reachable from this environment')
  })

  test('renders the branded Skillversity dashboard', async () => {
    await page.goto('/admin')
    await expect(page).toHaveURL(/\/admin$/)
    await expect(page.getByText('Skillversity Content HQ')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Programs' }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Site Settings' }).first()).toBeVisible()
  })

  test('exposes structured content collections', async () => {
    await page.goto('/admin/collections/programs')
    await expect(page.locator('h1', { hasText: 'Programs' }).first()).toBeVisible()

    await page.goto('/admin/collections/pages/create')
    await expect(page.locator('input[name="title"]')).toBeVisible()
    await expect(page.locator('select[name="template"]')).toBeVisible()
  })

  test('opens global settings used by the frontend', async () => {
    await page.goto('/admin/globals/site-settings')
    await expect(page.locator('h1', { hasText: 'Site Settings' }).first()).toBeVisible()
    await expect(page.getByText('Primary Lead Form')).toBeVisible()
  })
})
