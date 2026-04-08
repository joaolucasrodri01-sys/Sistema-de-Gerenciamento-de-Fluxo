# 📊 Sistema de Gerenciamento de Fluxo

> Uma solução robusta de gestão visual estilo Kanban para controle operacional de alta performance.

Este projeto transcende uma simples lista de tarefas, oferecendo um ecossistema completo para monitoramento de fluxos de trabalho, análise de prazos críticos e visualização de dados em tempo real.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
| :--- | :--- |
| **Framework** | [Vue.js 3](https://vuejs.org/) (Composition API) |
| **Linguagem** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode) |
| **Estilização** | [Tailwind CSS](https://tailwindcss.com/) |
| **Estado** | [Pinia](https://pinia.vuejs.org/) |
| **Persistência** | [VueUse](https://vueuse.org/) (Storage Engine) |
| **Build Tool** | [Vite](https://vitejs.dev/) |

---

## 🎯 Funcionalidades Premium

### 📋 Kanban Core
- **Fluxo Dinâmico:** Movimentação fluida de tarefas entre estados (A Fazer, Fazendo, Concluído).
- **Priorização Inteligente:** Categorização por níveis de criticidade com feedback visual imediato.

### ⏰ Controle de Prazos (Due Dates)
- **Alertas Preditivos:** Identificação visual de tarefas que vencem no dia corrente.
- **Overdue Detection:** Sistema de alerta crítico para tarefas com prazos expirados, garantindo que nada seja esquecido.

### 📈 Analytics Dashboard
- **Progress Tracking:** Barra de progresso dinâmica baseada na conclusão de tarefas.
- **Estatísticas Rápidas:** Contador em tempo real de produtividade e volume de trabalho.

### ✏️ Gestão Completa (CRUD)
- **Edição Avançada:** Interface intuitiva para modificação de registros existentes sem perda de contexto.
- **Auto-Save:** Persistência automática no `LocalStorage`, garantindo a integridade dos dados mesmo após o fechamento do navegador.

---

## 🎨 Interface e Experiência
O sistema foi projetado com foco em **Dark Mode Ergonomics**, utilizando uma paleta de cores Slate e Indigo para reduzir a fadiga visual durante longas jornadas de trabalho, mantendo o contraste necessário para alertas críticos em Rose e Amber.

---

## 🚀 Instalação e Uso

Para clonar e executar esta aplicação, você precisará do [Git](https://git-scm.com) e [Node.js](https://nodejs.org/en/download/) instalados.

```bash
# Clone o repositório
$ git clone [https://github.com/joaolucasrodri01-sys/sistema-de-gerenciamento-de-fluxo](https://github.com/joaolucasrodri01-sys/sistema-de-gerenciamento-de-fluxo)

# Entre na pasta
$ cd sistema-de-gerenciamento-de-fluxo

# Instale as dependências
$ npm install

# Execute a aplicação
$ npm run dev