import { test, expect } from '@playwright/test'


/// AAA - Arrange, Act, Assert
/// Arrange - Preparar o teste
/// Act - Executar o teste(AGIR)
/// Assert - Verificar o resultado do teste

test('deve consultar um pedido aprovado', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5174/')
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-1FZZZF')
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();
  //outra forma de preencher o campo
  //await page.getByLabel('Número do Pedido').fill('VLO-1FZZZF')


// Desafio 1: Verificar forma de verificar sem data test id
// Autor: Vinnicius Simões da Silva

  // Assert
  await expect(page.getByText('VLO-1FZZZF')).toBeVisible({ timeout: 10_000 })
  await expect(page.getByRole('region', { name: 'Resultado do pedido' })).toContainText('VLO-1FZZZF')
  // OU ainda, podemos usar o data-testid para verificar o texto do pedido
  // await expect(page.getByTestId('order-result-card')).toContainText('VLO-1FZZZF');

  await expect(page.getByText('APROVADO')).toBeVisible()
  await expect(page.getByRole('region', { name: 'Resultado do pedido' })).toContainText('APROVADO')
  // OU ainda, podemos usar o data-testid para verificar o texto do status
  // await expect(page.getByTestId('order-result-card')).toContainText('APROVADO'); 
})