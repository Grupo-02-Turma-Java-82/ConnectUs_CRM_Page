<div align="center">

# ConnectUS CRM

![./ConnectUs.png](https://ik.imagekit.io/brunogodoy/logoConnectUS_zMK4zUiI2?updatedAt=1751742289467)

<p>
  <strong>ConnectUS</strong> é uma plataforma de CRM moderna e intuitiva, desenvolvida para facilitar o gerenciamento de contatos, oportunidades de vendas e crescimento de negócios. Construída com <strong>React</strong>, <strong>TypeScript</strong> e <strong>Vite</strong>, a interface utiliza <strong>Tailwind CSS</strong> e bibliotecas de UI modernas para uma experiência fluida e responsiva.
</p>

</div>

---

## 🔮 Visão Geral

O sistema permite cadastrar e visualizar clientes (CPF e CNPJ), acompanhar oportunidades de negócio em tempo real por meio de um pipeline visual e acessar métricas no dashboard interativo.

### ✨ Funcionalidades Implementadas

* **Gestão de Clientes**: Suporte para pessoas físicas (CPF) e jurídicas (CNPJ).
* **Pipeline de Vendas**: Visualização em tempo real de oportunidades.
* **Dashboard Interativo**: Métricas de clientes e vendas.
* **Design Responsivo**: Adaptação automática para dispositivos móveis.
* **Notificações**: Alertas com `react-toastify`.

---

## 🚀 Tecnologias Utilizadas

* **Framework**: [React](https://react.dev/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
* **Estilização**:
    * [Tailwind CSS](https://tailwindcss.com/)
    * Componentes de UI: `@radix-ui/react-*`, `lucide-react`, `@phosphor-icons/react`
* **Gerenciamento de Estado**: React Context API
* **Validação de Formulários**: react-hook-form + zod
* **Roteamento**: react-router-dom
* **Requisições HTTP**: axios
* **Tabelas**: @tanstack/react-table

---

## 🛠️ Começando

### Pré-requisitos

* [Node.js](https://nodejs.org/en) (versão 18 ou superior)
* [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

### Instalação

1. **Clone o repositório:**
    ```sh
    git clone https://github.com/seu-usuario/connectus-crm-page.git
    ```

2. **Acesse o diretório do projeto:**
    ```sh
    cd connectus-crm-page
    ```

3. **Instale as dependências:**
    ```sh
    npm install
    ```

4. **Crie o arquivo `.env`:**
    ```env
    VITE_API_URL=http://localhost:8080
    ```

### Executando o Projeto

```sh
npm run dev
```

Acesse `http://localhost:5173` no navegador.

---

## 📂 Estrutura de Arquivos
```
/src
├── components/           # Componentes reutilizáveis
│   ├── ui/               # Base UI (Radix/Shadcn)
│   ├── ClienteForm.tsx   # Cadastro de clientes
│   ├── Dashboard.tsx     # Painel de métricas
│   ├── Navbar.tsx        # Navegação responsiva
│   └── Pipeline.tsx      # Etapas de vendas
├── pages/
│   └── Home.tsx          # Página principal
├── lib/
│   └── api.ts            # Configuração do Axios
├── App.tsx               # Componente raiz
└── main.tsx              # Entrada da aplicação
```

---

## 📜 Scripts Disponíveis

- `npm run dev` – Inicia o servidor de desenvolvimento  
- `npm run build` – Compila o projeto para produção  
- `npm run preview` – Visualiza a build de produção localmente  

---

## 🤝 Contato

📩 **grupo02turmajava82@hotmail.com**
