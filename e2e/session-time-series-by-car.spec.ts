import { test, expect } from '@playwright/test'

test('Session time series by car', async ({ page }) => {
  await page.goto('/session-time-series-car')
  await page.getByRole('button', { name: 'Next' }).click()

  await expect(page.locator('table th:first-of-type')).toHaveText('Date')
})
