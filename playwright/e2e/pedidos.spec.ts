import { test } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'
import { NavbarComponent } from '../support/components/NavbarComponent'
import { HomePage } from '../support/pages/HomePage'
import { OrderLockupPage, OrderDetails } from '../support/pages/OrderLockupPage'


/// AAA - Arrange, Act, Assert
/// Arrange - Preparar o teste
/// Act - Executar o teste(AGIR)
/// Assert - Verificar o resultado do teste


test.describe('Consultar pedidos', ()=>{

  let orderLockupPage: OrderLockupPage

  test.beforeEach(async ({page}) => {

        orderLockupPage = new OrderLockupPage(page)

        await new HomePage(page).goto()
        await new NavbarComponent(page).orderLockupLink()
        await orderLockupPage.validatePageLoaded()
        
  })

  test('deve consultar um pedido aprovado', async () => {

    // TestData
    const order: OrderDetails = {
      number: 'VLO-1FZZZF',
      status: 'APROVADO',
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'João Silva',
        email: 'joao@velo.dev',
      },
      payment: 'À Vista',
    }

    // Act
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido reprovado', async () => {

    // TestData

    const order: OrderDetails = {
      number: 'VLO-B9IT7Z',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'jobs@apple.com',
      },
      payment: 'À Vista',
    }

    // Act
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.validateStatusBadge(order.status)

  })

  test('deve consultar um pedido em analise', async () => {

    // TestData
    const order: OrderDetails = {
      number: 'VLO-BV242T',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Cleiton da Silva',
        email: 'cleiton@velo.dev',
      },
      payment: 'À Vista',
    }

    // Act
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.validateStatusBadge(order.status)
  })
  
  test('deve exibir uma mensagem de erro quando o pedido não é encontrado', async () => {
  
    //TestData
    const order = generateOrderCode()
  
    // Act
    await orderLockupPage.searchOrder(order)
  
  
    // Assert
    await orderLockupPage.validateOrderNotFound()

  })
})



// Desafio 1: Verificar forma de verificar sem data test id
// Autor: Vinnicius Simões da Silva

// Assert
// await expect(page.getByText('VLO-1FZZZF')).toBeVisible({ timeout: 10_000 })
// await expect(page.getByRole('region', { name: 'Resultado do pedido' })).toContainText('VLO-1FZZZF')
// // OU ainda, podemos usar o data-testid para verificar o texto do pedido
// // await expect(page.getByTestId('order-result-card')).toContainText('VLO-1FZZZF');

// await expect(page.getByText('APROVADO')).toBeVisible()
// await expect(page.getByRole('region', { name: 'Resultado do pedido' })).toContainText('APROVADO')
// OU ainda, podemos usar o data-testid para verificar o texto do status
// await expect(page.getByTestId('order-result-card')).toContainText('APROVADO');


//Alternativa para o professor  por xpath
// const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-1FZZZF"]')
// await expect(orderCode).toBeVisible({timeout:10_000})

//outra forma de preencher o campo
//await page.getByLabel('Número do Pedido').fill('VLO-1FZZZF')