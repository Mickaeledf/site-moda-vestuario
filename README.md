# Site Institucional — Marca de Moda e Vestuário

Site institucional de uma página principal + página de catálogo, construído em HTML, Tailwind CSS (CDN) e JavaScript puro. Não exige build, dependências nem servidor: basta abrir o `index.html`.

A estrutura foi preparada como **modelo de vitrine**: todos os textos comerciais, fotos e dados de contato são espaços reservados (`[SUA MARCA]`, `[Inserir Número]`, etc.) para receber o material oficial da marca.

## Estrutura de pastas

```
site-moda-vestuario/
├── index.html                      Marcação de todas as seções (home + catálogo)
├── assets/
│   ├── css/
│   │   └── styles.css              Estilos customizados (textura, revelação, scrollbar)
│   └── js/
│       ├── tailwind.config.js      Paleta, tipografia e animações do Tailwind
│       ├── brand-config.js         Dados oficiais da marca (WhatsApp, Instagram, cidade)
│       ├── products-data.js        Catálogo de produtos (array DEMO_PRODUCTS)
│       └── main.js                 Vitrine, navegação, modais e interações
├── LICENSE
└── README.md
```

## Seções do site

1. Header e navegação (desktop + menu mobile)
2. Banner principal editorial
3. Coleções em destaque (grid assimétrico de categorias)
4. Produtos em destaque com filtros
5. Identidade da marca (história e pilares editáveis)
6. Novidades e tendências
7. Instagram (grade preparada para integração do feed oficial)
8. Contato (WhatsApp, Instagram, endereço, formulário)
9. Rodapé institucional com política de privacidade

Página secundária: **Catálogo completo**, com abas de categoria e busca.

## Como executar localmente

Abra o `index.html` no navegador, ou sirva a pasta:

```powershell
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Checklist antes de publicar com dados reais

- [ ] **Logotipo e nome:** substituir `[SUA MARCA]` e o monograma no cabeçalho e no rodapé.
- [ ] **WhatsApp:** preencher `BRAND_CONFIG.whatsappNumber` em `assets/js/brand-config.js` (formato `5511999999999`).
- [ ] **Instagram:** trocar `@[seuinstagram]` e os links `https://instagram.com` pelo perfil oficial.
- [ ] **Produtos:** atualizar o array `DEMO_PRODUCTS` em `assets/js/products-data.js` com fotos, nomes, descrições, variações e preços reais.
- [ ] **Fotografias:** substituir as imagens de apoio pelas fotos oficiais dos ensaios da marca.
- [ ] **História da marca:** preencher os campos da seção *Identidade & Essência*.
- [ ] **Contato:** inserir número, endereço, horário de atendimento, e-mail e CNPJ no rodapé.
- [ ] **SEO:** ajustar `<title>`, `description`, `og:title`, `og:description` e `og:image` no `index.html`.
- [ ] **Formulário:** conectar o envio a um e-mail, serviço de formulários ou WhatsApp (hoje apenas exibe confirmação local).
- [ ] **Avisos de modelo:** remover a faixa "Modo Vitrine & Curadoria" e os selos "Modelo" das peças.

## Tecnologias

- HTML5 semântico
- Tailwind CSS via CDN, com paleta e tipografia customizadas
- JavaScript puro (sem frameworks nem build)
- Google Fonts: Cormorant Garamond, Plus Jakarta Sans e Space Mono
- Imagens de demonstração: Unsplash

## Licença

[MIT](LICENSE).
