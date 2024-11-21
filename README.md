## Vue Study

Este projeto é uma aplicação web que te permite realizar as operações CRUD. recupera estatísticas em tempo real de partidas do Avaí Futebol Clube utilizando a API do `Sofascore`. Ele foi construído com React no frontend e Node.js no backend.

### O Aplicativo está rodando para visualização no link: [Vue Study](https://herikr0drigues.github.io/vue-study/)
#### Para Login utilizar email:`user@user` e senha:`1234`


## 🚀 Funcionalidades

- Realizar cadastro de clientes por meio de um formulário, utiliza a api do ViaCEP para preencher sozinho
- Em realizer cadastro há um botão para gerar um cliente sozinho para ser mais rapido
- Possui uma tabela de todos os clientes cadastrados
- Na tabela de clientes há 3(três) botões, VISUALIZAR, EDITAR e EXCLUIR
- Permite editar o cliente
- Permite visualizar um resumo dos clientes por meio de gráficos em /resume
  
## ⚙️ Tecnologias

- **Frontend**: Vue, Tailwind CSS, Axios
- **Backend**: Node.js, Express, Cors
- **Banco de dados**: MongoDB
- **API**: VIACEP
- **Hospedagem**: GitHub Pages (Frontend), Railway (Backend).

## 🛠️ Como rodar o projeto localmente

### Requisitos

- [Node.js](https://nodejs.org/) (versão 18.x ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes)

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/HerikR0drigues/vue-study
    ```

2. Acesse o /frontend e instale as dependências e inicie o servidor
    ```bash
    npm install
    npm run dev
    ```

3. O backend está rodando ao vivo e não precisa de incicialização, mas caso queria rodar basta seguir os passos abaixo:

- Acessar o backend e instale as dependências e inicie o servidor:
    ```bash
    npm install
    npm start
    ```
- No arquivo `server.js` tem as configurações, por padrão está a porta `5000`.

4. Acessar os componentes e modificar as URLs que chamam à API

5. Exemplo para ajuste (IP e PORTA ficam a seu critério nas configurações do server.js)
    - De: "https://vue-study-production.up.railway.app/clientes" para "http://localhost:5000/clientes"
    - De: "https://vue-study-production.up.railway.app/auth/login" para "http://localhost:5000/auth/login"

## 🧠 Lógica do Projeto

O projeto é dividido em duas partes principais:

### Backend

1. **Banco de dados**:
    Configurado para usar o MongoDB, possui model e rotas para buscar dados dos clientes, login etc..

2. **Processamento de Dados**:
   Após a obtenção dos dados da API, o backend processa essas informações. Ele formata os dados para um formato mais amigável para o frontend e realiza qualquer transformação necessária. Esses dados são então enviados para o frontend em formato JSON.

3. **Servidor Node.js**:
   O servidor backend foi construído utilizando Node.js e Express. Ele escuta as requisições feitas pelo frontend e responde os dados. O backend também gerencia o roteamento das requisições.

4. **Endpoints**:
    - `/auth/login`
    - `/clientes/` (Post para criar)
    - `/clientes/` (Get para ler)
    - `/clientes/edit`
    - `/clientes/delete`
     
### Frontend

1. **Vue**:
   O frontend foi desenvolvido utilizando Vue. Ele consome as APIs fornecidas pelo backend e exibe as informações de maneira dinâmica. A interface foi projetada para ser simples e fácil de navegar, destacando as informações mais importantes.

2. **Tailwind CSS**:
   A estilização foi implementada utilizando o Tailwind CSS, um framework utilitário que facilita a criação de layouts responsivos e visualmente atraentes. O uso do Tailwind permite uma personalização rápida e eficiente da interface, mantendo o código CSS enxuto e organizado.

3. **Integração com o Backend**:
   O frontend se comunica com o backend para obter as informações dos clientes e Login. Ele utiliza requisições HTTP (via Axios) para buscar os dados e exibi-los ao usuário, atualizando a interface sempre que novas informações são recebidas.
