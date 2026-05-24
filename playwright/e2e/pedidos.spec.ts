import { test, expect } from '@playwright/test'

test('deve consultar um pedido aprovado', async ({ page }) => {
  await page.goto('http://localhost:5174/')

  // Checkpoint na tela inicial
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()

  // Checkpoint na tela de consulta de pedido
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  await page.getByTestId('search-order-id').fill('VLO-1FZZZF')

  await page.getByTestId('search-order-button').click()

  await expect(page.getByTestId('order-result-id')).toBeVisible()
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-1FZZZF')

  await expect(page.getByTestId('order-result-status')).toBeVisible()
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
})