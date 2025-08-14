# 🚀 Automação QA com Cypress

![Cypress](https://img.shields.io/badge/Cypress-E2E%20Testing-green?style=flat&logo=cypress) 
![Cucumber](https://img.shields.io/badge/Cucumber-BDD-blue?style=flat&logo=cucumber)
![Node.js](https://img.shields.io/badge/Node.js-v18.x%20LTS-green?style=flat&logo=node.js)
![QA Automation](https://img.shields.io/badge/QA%20Automation-Continuous%20Testing-orange?style=flat&logo=testing-library)
![License](https://img.shields.io/badge/License-MIT-brightgreen?style=flat)

Este repositório contém diferentes implementações de automação de testes E2E usando Cypress e relatórios customizados para o New Relic.

---

Sites usados nos exemplos:

E-commerce (https://www.saucedemo.com)<br>

---

## 📂 Branches Disponíveis

| Branch                               | Descrição                                                                                                  |                                                                                                       |
|--------------------------------------|------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| **Main**                   |           Exemplo básico do cypress.                                                  | [link](https://github.com/caioandrian/cypress_e2e/tree/main)                                     |

---

## ⚙️ Instalação e Execução do Projeto

Este guia ajudará você a instalar as ferramentas necessárias e executar o projeto de automação de testes. O Cypress é um framework de testes E2E que facilita a criação, execução e depuração de testes com uma abordagem moderna e interativa.

### Requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- **Node.js (versão 18.x LTS)** - [Download aqui](https://nodejs.org/en/)
- **Visual Studio Code (VS Code)** - [Download aqui](https://code.visualstudio.com/download)
- **Cypress** (versão ^14.4.1, será instalado como dependência do projeto)

### 🚀 Passos de Instalação

#### 1. Instalação do Node.js

1. Acesse o [site oficial do Node.js](https://nodejs.org/en/) e baixe a versão LTS mais recente.
2. Execute o instalador e siga as instruções clicando em `Next` até o final.
3. Após a conclusão, confirme a instalação executando o comando abaixo no terminal:

    ```bash
    node -v
    ```

   Isso deve retornar a versão do Node.js instalada.

#### 2. Instalação do Visual Studio Code

1. Baixe e instale o **Visual Studio Code** [aqui](https://code.visualstudio.com/download).
2. Execute o instalador, clique em `Next` até o final e depois em `Finish` para concluir a instalação.

#### 3. Clonando o Repositório

No terminal, execute os comandos abaixo para clonar este repositório e instalar as dependências:

```bash
git clone https://github.com/caioandrian/cypress_e2e.git
cd cypress_e2e
npm install
```


#### 4. Extensões VS Code

Lista de plugins que podem auxiliar no desenvolvimento da automação.

- JavaScript (ES6) code snippets
- Commit Message Editor - **Formatador de commits**
- Markdown Preview Enhanced - **Visualizador de arquivos .md**
- Prettier - Code formatter - **Formatador de código**
- Material Icon Theme
- Cucumber (Gherkin) Full Support
- Cypress-cucumber-generator
- Snippets and Syntax Highlight for Gherkin (Cucumber)
- Bracket Pair Colorizer 2
- Add Only
- Cypress Snippets
- ES6 Mocha Snippets

--- FIM ---

### 📦 Dependências Principais

Este projeto utiliza as seguintes dependências principais:

- **axios**: ^1.7.9
- **mocha**: ^10.8.2
- **eslint**: ^9.15.0
- **cypress**: ^14.4.1

### 🛠️ Scripts Disponíveis

Os seguintes scripts estão disponíveis para facilitar o uso do Cypress:

- `cy:open`: Abre o Cypress em modo interativo.
- `cy:open-prod`: Abre o Cypress em modo interativo com configuração de produção.
- `cy:run-saucedemo`: Executa os testes do saucedemo em modo headless no Chrome.
