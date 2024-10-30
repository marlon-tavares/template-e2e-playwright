// support/utils.js

// Function to login in page with credentials
async function login(page, username, password) {
    await page.fill('[data-test="username"]', username);
    await page.fill('[data-test="password"]', password);
    await page.click('[data-test="login-button"]');
}

// Function to access page and login
async function createSession(page) {
    const validUsername = 'standard_user';
    const validPassword = 'secret_sauce';
    await page.goto('https://www.saucedemo.com/');
    await page.fill('[data-test="username"]', validUsername);
    await page.fill('[data-test="password"]', validPassword);
    await page.click('[data-test="login-button"]');
}


// Function to assert login error message
async function assertErrorMessage(page, expect, expectedMessage) {
    const errorLocator = page.locator('[data-test="error"]');
    await expect(errorLocator).toBeVisible(); 
    await expect(errorLocator).toHaveText(expectedMessage);
}

module.exports = { login, assertErrorMessage, createSession };