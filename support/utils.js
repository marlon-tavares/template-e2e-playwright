// support/utils.js

// Function to login in page
async function login(page, username, password) {
    await page.fill('[data-test="username"]', username);
    await page.fill('[data-test="password"]', password);
    await page.click('[data-test="login-button"]');
}

async function assertErrorMessage(page, expect, expectedMessage) {
    const errorLocator = page.locator('[data-test="error"]');
    await expect(errorLocator).toBeVisible(); 
    await expect(errorLocator).toHaveText(expectedMessage);
}

module.exports = { login, assertErrorMessage };