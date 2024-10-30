# Technical Tests E2E Playwright

Este projeto contém testes end-to-end (E2E) usando [Playwright](https://playwright.dev/), voltados para verificar funcionalidades principais de uma aplicação, como o fluxo de login e o carrinho de compras.

## Pré-requisitos

- Node.js (v14 ou superior)
- npm (gerenciador de pacotes do Node)

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd TECHNICAL-TESTS-E2E-PLAYWRIGHT

2. **Instale as dependências do projeto:**
   ```bash
   npm install

3. **Instale as dependências do playwright:**
   ```bash
   npx playwright install


## Configuração

1. **Para executar todos os testes:**
   ```bash
   npx playwright test

2. **Para executar um teste específico:**
   ```bash
   npx playwright test tests/e2e/cart/cart.spec.js

3. **Para executar testes com relatório:**
   ```bash
   npx playwright test --reporter=html

## Boas práticas

- Execução Local: Execute os testes localmente antes de enviá-los para o repositório.

- Git Workflow: Crie branches para cada nova funcionalidade de teste e faça pull requests
