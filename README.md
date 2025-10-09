# Nauta Treinamentos - Plataforma de Cursos Offshore

Este é um projeto de redesign da plataforma Nauta Treinamentos, desenvolvido com Next.js 15, React 19 e Tailwind CSS.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React para produção
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Biblioteca para animações
- **Radix UI** - Componentes acessíveis e não estilizados
- **Lucide React** - Ícones modernos
- **Canvas Confetti** - Efeitos de confete

## 📁 Estrutura do Projeto

\`\`\`
nauta-treinamentos-redesign/
├── app/                          # Páginas da aplicação (App Router)
│   ├── layout.tsx               # Layout raiz
│   ├── page.tsx                 # Página inicial
│   ├── globals.css              # Estilos globais
│   ├── cursos/                  # Página de listagem de cursos
│   ├── curso/[courseId]/        # Página individual do curso
│   ├── sobre/                   # Página sobre a empresa
│   ├── login/                   # Página de login
│   ├── cadastro/                # Página de cadastro
│   ├── carrinho/                # Página do carrinho
│   ├── meus-cursos/             # Página dos cursos do usuário
│   ├── meus-certificados/       # Página de certificados
│   └── minha-conta/             # Página de configurações da conta
├── components/                   # Componentes reutilizáveis
│   ├── layout/                  # Componentes de layout
│   │   ├── navbar.tsx           # Barra de navegação
│   │   └── footer.tsx           # Rodapé
│   └── ui/                      # Componentes de interface
│       ├── course-card.tsx      # Card de curso
│       ├── testimonial-item.tsx # Item de depoimento
│       └── ...                  # Outros componentes UI
├── lib/                         # Utilitários e dados
│   ├── data.ts                  # Dados mockados da aplicação
│   └── utils.ts                 # Funções utilitárias
├── public/                      # Arquivos estáticos
└── ...                          # Arquivos de configuração
\`\`\`

## 🎯 Funcionalidades Principais

### 📚 Sistema de Cursos
- **Catálogo de cursos** com filtros por categoria e busca
- **Páginas detalhadas** de cada curso com informações completas
- **Sistema de aulas** com vídeos, textos e quizzes
- **Acompanhamento de progresso** em tempo real
- **Certificados** gerados automaticamente

### 👤 Gestão de Usuários
- **Sistema de login/cadastro** simulado
- **Perfil do usuário** com informações pessoais
- **Histórico de cursos** e progresso
- **Carrinho de compras** para cursos

### 🎨 Interface e Experiência
- **Design responsivo** para desktop e mobile
- **Animações suaves** com Framer Motion
- **Componentes acessíveis** com Radix UI
- **Tema consistente** com cores da marca

### 📱 Recursos Mobile
- **Menu lateral** responsivo
- **Interface otimizada** para telas pequenas
- **Navegação intuitiva** entre aulas
- **Botões de ação** bem posicionados

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn como gerenciador de pacotes

### Instalação
1. Clone o repositório:
\`\`\`bash
git clone [URL_DO_REPOSITORIO]
cd nauta-treinamentos-redesign
\`\`\`

2. Instale as dependências:
\`\`\`bash
npm install
# ou
yarn install
\`\`\`

3. Execute o projeto em modo de desenvolvimento:
\`\`\`bash
npm run dev
# ou
yarn dev
\`\`\`

4. Abra [http://localhost:3000](http://localhost:3000) no navegador

### Scripts Disponíveis
- `npm run dev` - Executa em modo de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Executa build de produção
- `npm run lint` - Executa verificação de código

## 📊 Dados e Estado

### Dados Mockados
O projeto utiliza dados simulados localizados em `lib/data.ts`:
- **Cursos** com informações completas
- **Usuários** e progresso de aprendizado
- **Quizzes** e avaliações
- **Depoimentos** e estatísticas

### Gerenciamento de Estado
- **useState** para estado local dos componentes
- **useEffect** para efeitos colaterais
- **useMemo** para otimização de performance
- **Context API** (pode ser implementado para estado global)

## 🎨 Design System

### Cores Principais
- **Teal** (#0D9488) - Cor primária da marca
- **Amber** (#F59E0B) - Cor de destaque/ação
- **Slate** - Tons de cinza para textos e fundos
- **Green/Red** - Feedback de sucesso/erro

### Tipografia
- **Inter** - Fonte principal (Google Fonts)
- Hierarquia clara com tamanhos responsivos

### Componentes
- Baseados no **shadcn/ui**
- Totalmente customizáveis
- Acessibilidade integrada

## 🔧 Configurações

### Tailwind CSS
Configurado em `tailwind.config.js` com:
- Cores personalizadas da marca
- Animações customizadas
- Breakpoints responsivos

### TypeScript
Configuração em `tsconfig.json` com:
- Strict mode habilitado
- Path mapping para imports
- Suporte completo ao Next.js

### Next.js
Configuração em `next.config.mjs` com:
- Otimização de imagens
- Configurações de build

## 📈 Performance e Otimização

### Otimizações Implementadas
- **Lazy loading** de componentes
- **Memoização** com useMemo e useCallback
- **Otimização de imagens** com Next.js Image
- **Code splitting** automático

### SEO
- **Metadata** configurado em cada página
- **Estrutura semântica** HTML
- **URLs amigáveis** para cursos

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte o repositório ao Vercel
2. Configure as variáveis de ambiente (se necessário)
3. Deploy automático a cada push

### Outras Plataformas
O projeto pode ser deployado em qualquer plataforma que suporte Next.js:
- Netlify
- AWS Amplify
- Railway
- Heroku

## 🤝 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte:
- Email: contato@nautatreinamentos.com.br
- Telefone: +55 (21) 99999-8888

---

**Desenvolvido com ❤️ pela equipe Nauta Treinamentos**
