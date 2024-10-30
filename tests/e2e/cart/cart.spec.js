const { test } = require('@playwright/test');
const { createSession } = require('../../../support/utils');

test.describe('Cart Feature', () => {

    test.beforeEach(async ({ page }) => {
        await createSession(page);
    });

    test('Usuário adicionando e removendo produtos no carrinho', async ({ page }) => {
        const produtos = [
            '[data-test="add-to-cart-sauce-labs-backpack"]',
            '[data-test="add-to-cart-sauce-labs-bike-light"]',
            '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
            '[data-test="add-to-cart-sauce-labs-fleece-jacket"]',
        ];

        const produtosRemover = [
            '[data-test="remove-sauce-labs-backpack"]',
            '[data-test="remove-sauce-labs-bike-light"]',
            '[data-test="remove-sauce-labs-bolt-t-shirt"]',
            '[data-test="remove-sauce-labs-fleece-jacket"]',
        ];

        for (let i = 0; i < produtos.length; i++) {
            await page.click(produtos[i]);
            await page.waitForTimeout(500); 

            const badge = await page.locator('.shopping_cart_badge[data-test="shopping-cart-badge"]');
            await badge.waitFor({ state: 'visible', timeout: 5000 });

            const badgeText = await badge.innerText();

            if (badgeText === (i + 1).toString()) {
                console.log(`O valor do badge após adicionar ${i + 1} item(s) é ${badgeText}.`);
            } else {
                console.log(`Erro: esperado ${i + 1}, mas o valor do badge é ${badgeText}.`);
            }
        }

        for (let i = produtos.length - 1; i >= 0; i--) {
            await page.click(produtosRemover[i]);
            await page.waitForTimeout(500); 

            const badge = await page.locator('.shopping_cart_badge[data-test="shopping-cart-badge"]');
            if (await badge.count() > 0) {
                const badgeText = await badge.innerText();

                if (badgeText === i.toString()) {
                    console.log(`O valor do badge após remover ${produtos.length - i} item(s) é ${badgeText}.`);
                } else {
                    console.log(`Erro: esperado ${i}, mas o valor do badge é ${badgeText}.`);
                }
            } else {
                console.log(`O badge não está visível após remover ${produtos.length - i} item(s).`);
            }
        }

        const badgeVisible = await page.locator('.shopping_cart_badge[data-test="shopping-cart-badge"]').count();
        if (badgeVisible === 0) {
            console.log('Todos os itens foram removidos do carrinho.');
        } else {
            console.log(`Erro: o badge ainda tem valor ${badgeVisible}, mas esperávamos que estivesse vazio.`);
        }
    });
});
