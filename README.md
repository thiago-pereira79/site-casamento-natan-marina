# 💍 Site de Casamento - Natan & Marina

![Licença](https://img.shields.io/badge/Licença-MIT-green)
![Status](https://img.shields.io/badge/Status-Concluído-brightgreen)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Responsivo](https://img.shields.io/badge/Design-Responsivo-blue)

---

# 📖 Sobre o projeto

Este projeto consiste em um site desenvolvido para compartilhar as informações do **almoço de celebração do casamento civil de Natan & Marina**, reunindo amigos e familiares para comemorar esse momento especial.

O objetivo é oferecer uma experiência simples e elegante para os convidados, reunindo em um único lugar:

- Informações do evento
- Local e horário da comemoração
- Galeria de fotos do casal
- Confirmação de presença via WhatsApp
- Espaço para mensagens e depoimentos dos convidados

---

# 🌐 Acesse o site

🔗 https://site-casamento-natan-marina.vercel.app

---

# 🛠 Tecnologias utilizadas

### Frontend

- React
- TypeScript
- Vite
- HTML5
- CSS3
- JavaScript

### Interface e animações

- Lucide Icons
- Framer Motion

### Backend

- Vercel Serverless Functions
- API REST

### Banco de dados

- Supabase

### Deploy

- Vercel
- GitHub

---

# ⚙️ Funcionalidades

- Página de apresentação do casal
- Contagem regressiva para o evento
- Galeria de fotos interativa
- Informações do local com link direto para o **Google Maps**
- Confirmação de presença via **WhatsApp**
- Envio de **mensagens e depoimentos dos convidados**
- Exclusão de mensagens pelo modo administrador
- Validação de mensagens para evitar spam
- Atualização automática das mensagens
- API para gerenciamento das mensagens

---

# 🔐 Segurança e controle

O sistema de mensagens possui algumas proteções básicas:

- Limite de envio por IP
- Bloqueio de mensagens duplicadas
- Validação de tamanho de nome e mensagem
- Exclusão de mensagens protegida por senha de administrador

---

# 🏗 Estrutura do projeto

```bash
.
├── api
│   ├── admin-login.ts
│   ├── delete-message.ts
│   ├── messages.ts
│   └── rsvp.ts
│
├── src
│   ├── assets
│   └── App.tsx
│
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

# 🚀 Deploy

O projeto está hospedado na **Vercel** e utiliza integração automática com o **GitHub** para deploy contínuo.

Sempre que uma alteração é enviada para o repositório, a Vercel realiza automaticamente um novo deploy do site.

---

# 📜 Licença

Este projeto utiliza a **licença MIT** para o código-fonte.

As imagens, textos e informações presentes no site pertencem aos respectivos autores e não devem ser reutilizados sem autorização dos proprietários.

---

# 👨‍💻 Autor

Desenvolvido por **Thiago Pereira**