# Test T-Alpha

## Descrição

O **Test T-Alpha** é uma aplicação web que permite o gerenciamento de produtos, incluindo a capacidade de listar, adicionar, editar e excluir produtos. A aplicação também possui um sistema de autenticação básico para acesso às funcionalidades.

## Funcionalidades

### Autenticação

- **Login:** Usuários podem fazer login na aplicação. Ao acessar a tela de login, qualquer token existente é removido para garantir que o usuário não esteja autenticado erroneamente.
- **Logout:** Usuários autenticados podem fazer logout, removendo o token do local storage e redirecionando-os para a página de login.

### Gerenciamento de Produtos

- **Listar Produtos:** Exibe todos os produtos cadastrados na aplicação.
- **Buscar Produtos:** Permite a busca de produtos pelo ID.
- **Adicionar Produtos:** Usuários autenticados podem adicionar novos produtos fornecendo nome, descrição, preço e quantidade em estoque.
- **Editar Produtos:** Usuários autenticados podem editar os detalhes de produtos existentes.
- **Excluir Produtos:** Usuários autenticados podem excluir produtos da lista.

## Estrutura do Projeto

### Componentes Principais

- **Header:** Componente de cabeçalho que inclui um botão de logout visível apenas quando um token de autenticação está presente.
- **Login:** Tela de login onde os usuários podem autenticar-se e acessar a aplicação.
- **Products:** Tela principal para gerenciamento de produtos, incluindo formulário para adicionar e editar produtos e uma lista para exibição.

### Arquivos e Diretórios

- `src/`: Diretório principal com o código fonte da aplicação.
  - `components/`: Contém os componentes React usados na aplicação.
    - `Header.tsx`: Componente de cabeçalho.
    - `Login.tsx`: Tela de login.
    - `Products.tsx`: Tela de gerenciamento de produtos.
  - `App.tsx`: Componente principal da aplicação que configura as rotas.
  - `index.tsx`: Ponto de entrada da aplicação.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou abrir issues para sugerir melhorias ou relatar problemas.
