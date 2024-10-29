const { test, expect } = require('@playwright/test');
const { login, assertErrorMessage } = require('../../../support/utils');

test.describe('Login Feature', () => {
    const validUsername = 'standard_user';
    const validPassword = 'secret_sauce';
    
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(page).toHaveTitle(/Swag Labs/); 
    });

    test('Usuário realizando login com credenciais válidas', async ({ page }) => {
        await login(page, validUsername, validPassword);
        await expect(page.locator('[data-test="title"]')).toBeVisible();
        await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
        await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
        await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
    });

    test('Usuário realizando login com credenciais inválidas', async ({ page }) => {
        await login(page, 'invalido', 'invalido');
        await assertErrorMessage(page, expect, 'Epic sadface: Username and password do not match any user in this service');
    });

    test('Usuário realizando login com username inválido', async ({ page }) => {
        await login(page, 'invalido', validPassword);
        await assertErrorMessage(page, expect, 'Epic sadface: Username and password do not match any user in this service');
    });

    test('Usuário realizando login com password inválido', async ({ page }) => {
        await login(page, validUsername, 'invalido');
        await assertErrorMessage(page, expect, 'Epic sadface: Username and password do not match any user in this service');
    });

    test('Usuário realizando login sem informar credenciais', async ({ page }) => {
        await page.click('[data-test="login-button"]');
        await assertErrorMessage(page, expect, 'Epic sadface: Username is required');
    });

    test('Usuário realizando login sem informar username', async ({ page }) => {
        await page.fill('[data-test="password"]', validPassword);
        await page.click('[data-test="login-button"]');
        await assertErrorMessage(page, expect, 'Epic sadface: Username is required');
    });

    test('Usuário realizando login sem informar password', async ({ page }) => {
        await page.fill('[data-test="username"]', validUsername);
        await page.click('[data-test="login-button"]');
        await assertErrorMessage(page, expect, 'Epic sadface: Password is required');
    });
});