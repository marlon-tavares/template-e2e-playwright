const { test, expect } = require('@playwright/test');
const { createSession } = require('../../../support/utils');
const { faker } = require('@faker-js/faker'); // Importa o Faker

test.describe('checkout feature', () => {

    test.beforeEach(async ({ page }) => {
        await createSession(page);
    });

    test('Usuário realizando fluxo de checkout com sucesso', async ({ page }) => {
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('[data-test="shopping-cart-link"]');
        await page.waitForURL('**/cart.html'); 
        await page.click('[data-test="checkout"]');
        await page.fill('[data-test="firstName"]', faker.name.firstName());
        await page.fill('[data-test="lastName"]', faker.name.lastName());
        await page.fill('[data-test="postalCode"]', faker.address.zipCode());
        await page.click('[data-test="continue"]');
        await page.waitForSelector('[data-test="title"]');
        await page.click('[data-test="finish"]');
        await page.waitForSelector('[data-test="complete-header"]');
        const mensagem = await page.locator('[data-test="complete-header"]').innerText();
        await expect(mensagem).toBe('Thank you for your order!');
        await page.click('[data-test="back-to-products"]');
        await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
        await page.waitForURL('**/inventory.html'); 
    })
});
