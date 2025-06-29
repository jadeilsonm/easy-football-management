# Página de Edição de Perfil

## Funcionalidades Implementadas

### 📝 Edição de Perfil de Usuário
Uma página completa para edição do perfil do usuário com as seguintes funcionalidades:

- **Upload de Imagem de Perfil**: 
  - Suporte para formatos JPG, PNG, GIF e WebP
  - Validação de tamanho (máximo 5MB)
  - Preview em tempo real da imagem
  - Interface intuitiva com ícone de câmera

- **Edição de Informações Pessoais**:
  - Nome completo (obrigatório)
  - Email (somente leitura)
  - Número de celular (opcional, com formatação automática)

- **Validações**:
  - Validação de formatos de imagem
  - Validação de tamanho de arquivo
  - Validação de número de telefone brasileiro
  - Formatação automática do telefone: (11) 99999-9999

### 🎨 Interface de Usuário
- Design moderno e responsivo usando Tailwind CSS
- Gradiente de cores no cabeçalho
- Ícones do Heroicons para melhor UX
- Estados de loading e salvamento
- Notificações toast para feedback do usuário

### 🔐 Segurança e Autenticação
- Página protegida por autenticação
- Integração com AuthContext
- Interceptadores de API para tratamento de erros

## Como Usar

### Acesso à Página
1. Faça login na aplicação
2. Clique no avatar do usuário na barra de navegação
3. Selecione "Editar Perfil" no menu dropdown

### Alteração da Foto de Perfil
1. Clique no ícone de câmera sobre a foto atual
2. Selecione uma imagem do seu dispositivo
3. A imagem será validada e enviada automaticamente
4. Você receberá uma notificação de sucesso

### Edição das Informações
1. Altere o nome completo (campo obrigatório)
2. Digite ou edite o número do celular (formatação automática)
3. O email não pode ser alterado
4. Clique em "Salvar Alterações"

## Estrutura de Arquivos

```
src/
├── pages/
│   └── EditProfile.tsx          # Página principal de edição
├── services/
│   └── userService.ts           # Serviços para operações de usuário
├── components/
│   └── Navbar.tsx              # Navbar com menu de usuário atualizado
└── context/
    ├── AuthContext.tsx         # Contexto de autenticação
    └── ToastContext.tsx        # Contexto para notificações
```

## Rotas

- `/profile/edit` - Página de edição de perfil (protegida)

## API Endpoints Utilizados

- `GET /users/{userId}` - Buscar dados do usuário
- `PUT /users/{userId}` - Atualizar dados do usuário
- `POST /users/upload-profile-image` - Upload da imagem de perfil

## Dependências

- React 18+
- TypeScript
- Tailwind CSS
- React Router
- Heroicons
- Axios

## Considerações Técnicas

### Validações de Arquivo
- Tipos aceitos: image/jpeg, image/jpg, image/png, image/gif, image/webp
- Tamanho máximo: 5MB
- Validação no frontend antes do upload

### Formatação de Telefone
- Suporte para números de 10 e 11 dígitos
- Formatação automática durante a digitação
- Validação específica para números brasileiros

### Gerenciamento de Estado
- Estado local para dados do formulário
- Estados de loading para UX otimizada
- Context API para autenticação e notificações

### Responsividade
- Design responsivo para desktop, tablet e mobile
- Layout adaptativo usando Tailwind CSS Grid e Flexbox

## Melhorias Futuras

- [ ] Histórico de alterações do perfil
- [ ] Configurações de privacidade
- [ ] Integração com redes sociais
- [ ] Crop de imagens antes do upload
- [ ] Múltiplos formatos de telefone (internacional)
- [ ] Validação de CPF para usuários brasileiros
