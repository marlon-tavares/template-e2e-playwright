const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    use: {
        headless: false, // Para ver o navegador durante os testes
        fullyParallel: true,
    },
});
