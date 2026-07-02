import { test, expect } from '@playwright/test'

test.describe('Frontend CMS wiring', () => {
  test('loads the CMS-backed homepage', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Skillversity Global/)
    await expect(page.locator('h1').first()).toContainText(/Stop studying|Start skilling/)
    await expect(page.getByRole('link', { name: /Programs/i }).first()).toBeVisible()
  })

  test('loads the CMS-backed programs listing and detail route', async ({ page }) => {
    await page.goto('/programs')
    await expect(page.locator('h1').first()).toContainText(/Industry-led programs|programs/i)
    await expect(page.getByRole('link', { name: /Hospital Administration/i }).first()).toBeVisible()

    await page.goto('/programs/hospital-administration')
    await expect(page.locator('h1').first()).toContainText(/Hospital Administration/i)
    await expect(page.getByText(/Book Free Counselling Call/i).first()).toBeVisible()
  })

  test('loads structured public pages and branded blog route', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('h1').first()).toContainText(/job-ready|campus|career/i)

    await page.goto('/blog/logistics-career-guide')
    await expect(page.locator('h1').first()).toContainText(/Logistics/i)
  })
})
