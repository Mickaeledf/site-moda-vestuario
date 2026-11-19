/* =====================================================================
   LÓGICA DE VITRINE, NAVEGAÇÃO E INTERAÇÕES
   Depende de: brand-config.js (BRAND_CONFIG) e products-data.js (DEMO_PRODUCTS)
   ---------------------------------------------------------------------
   Índice:
     1. Estado e inicialização
     2. Renderização de produtos (home e catálogo)
     3. Navegação entre as duas páginas e menu mobile
     4. Modal de produto
     5. Gaveta de WhatsApp
     6. Edição de prévia da marca e formulário de contato
     7. Modais informativos (privacidade e checklist)
     8. Animação de revelação ao rolar
   ===================================================================== */

/* ---------------------------------------------------------------------
   1. ESTADO E INICIALIZAÇÃO
   --------------------------------------------------------------------- */
let currentCatalogCategory = "Todos";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("current-year").textContent = new Date().getFullYear();
    renderFeaturedProducts("Todos");
    renderCatalogGrid();
    initScrollReveal();
});

/* ---------------------------------------------------------------------
   2. RENDERIZAÇÃO DE PRODUTOS
   --------------------------------------------------------------------- */

// Cria o HTML de um cartão de produto
function createProductCardHTML(product) {
    const variantsHTML = product.variants.slice(0, 4).map(v =>
        `<span class="px-2 py-0.5 rounded bg-brand-linen text-brand-obsidian font-mono text-[10px]">${v}</span>`
    ).join("");

    return `
        <article class="fashion-card group bg-white rounded-3xl overflow-hidden border border-brand-obsidian/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
                <div class="relative aspect-[3/4] overflow-hidden bg-brand-espresso cursor-pointer" onclick="openProductModal(${product.id})">
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                        onerror="this.src='https://placehold.co/600x800/241E1B/F4EFEA?text=Produto+Demonstrativo'"
                        class="w-full h-full object-cover"
                    >
                    <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-obsidian/85 backdrop-blur-sm text-brand-gold font-mono text-[10px] uppercase tracking-wider">
                        ${product.category}
                    </span>
                    <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-brand-sand/95 text-brand-obsidian font-mono text-[9px] uppercase font-bold">
                        Modelo
                    </span>
                </div>
                <div class="p-5">
                    <h3 onclick="openProductModal(${product.id})" class="font-serif text-xl font-semibold text-brand-obsidian group-hover:text-brand-terracotta transition cursor-pointer leading-snug mb-1.5">
                        ${product.name}
                    </h3>
                    <p class="text-xs text-brand-slate leading-relaxed mb-3 line-clamp-2">
                        ${product.shortDesc}
                    </p>
                    <div class="flex flex-wrap gap-1.5 mb-3">
                        ${variantsHTML}
                    </div>
                </div>
            </div>
            <div class="px-5 pb-5 pt-3 border-t border-brand-obsidian/10 flex items-center justify-between gap-2">
                <span class="font-mono text-xs font-bold text-brand-obsidian">${product.priceLabel}</span>
                <button onclick="openProductModal(${product.id})" class="px-4 py-2 rounded-full bg-brand-obsidian hover:bg-brand-terracotta text-brand-sand text-[11px] font-semibold uppercase tracking-wider transition">
                    Consultar
                </button>
            </div>
        </article>
    `;
}

// Renderiza os 4 produtos em destaque na página inicial
function renderFeaturedProducts(category) {
    const grid = document.getElementById("featured-products-grid");
    const filtered = category === "Todos"
        ? DEMO_PRODUCTS.slice(0, 4)
        : DEMO_PRODUCTS.filter(p => p.category === category).slice(0, 4);

    grid.innerHTML = filtered.map(createProductCardHTML).join("");
}

// Atualiza botões de filtro na Home
function filterFeaturedProducts(category) {
    const buttons = document.querySelectorAll("#home-filter-buttons .filter-btn");
    buttons.forEach(btn => {
        if (btn.textContent.includes(category) || (category === "Todos" && btn.textContent.includes("Todos")) || (category === "Alfaiataria" && btn.textContent.includes("Social"))) {
            btn.className = "filter-btn active px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-obsidian text-brand-sand transition";
        } else {
            btn.className = "filter-btn px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-sand text-brand-obsidian border border-brand-obsidian/15 hover:border-brand-obsidian transition";
        }
    });
    renderFeaturedProducts(category);
}

// Renderiza a grade completa da 2ª página (catálogo), com filtro e busca
function renderCatalogGrid() {
    const grid = document.getElementById("catalog-products-grid");
    const query = (document.getElementById("catalog-search")?.value || "").toLowerCase().trim();

    const filtered = DEMO_PRODUCTS.filter(p => {
        const matchCat = currentCatalogCategory === "Todos" || p.category === currentCatalogCategory;
        const matchText = p.name.toLowerCase().includes(query) || p.shortDesc.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
        return matchCat && matchText;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-16 text-brand-slate">Nenhuma peça encontrada para este filtro.</div>`;
        return;
    }
    grid.innerHTML = filtered.map(createProductCardHTML).join("");
}

function filterCatalogPage(category) {
    currentCatalogCategory = category;
    document.querySelectorAll(".cat-tab").forEach(tab => {
        if (tab.dataset.cat === category) {
            tab.className = "cat-tab px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-obsidian text-brand-sand";
        } else {
            tab.className = "cat-tab px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-linen text-brand-obsidian hover:bg-brand-obsidian hover:text-brand-sand transition";
        }
    });
    renderCatalogGrid();
}

/* ---------------------------------------------------------------------
   3. NAVEGAÇÃO ENTRE PÁGINAS E MENU MOBILE
   --------------------------------------------------------------------- */

// Alterna entre a Página Principal (Home) e a Segunda Página (Catálogo)
function switchView(viewName) {
    const homeView = document.getElementById("view-home");
    const catalogView = document.getElementById("view-catalog");

    if (viewName === "catalog") {
        homeView.classList.add("hidden");
        catalogView.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
        renderCatalogGrid();
    } else {
        catalogView.classList.add("hidden");
        homeView.classList.remove("hidden");
    }
}

// Abre uma categoria específica diretamente na 2ª página (Catálogo)
function openCategoryInCatalog(category) {
    switchView("catalog");
    filterCatalogPage(category);
}

function toggleMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    const btn = document.getElementById("mobile-menu-btn");
    const openIcon = document.getElementById("menu-icon-open");
    const closeIcon = document.getElementById("menu-icon-close");

    const isHidden = menu.classList.contains("hidden");
    menu.classList.toggle("hidden");
    openIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
    btn.setAttribute("aria-expanded", isHidden ? "true" : "false");
}

function mobileNav(view, anchor) {
    toggleMobileMenu();
    switchView(view);
    if (anchor) {
        setTimeout(() => {
            document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
        }, 80);
    }
}

/* ---------------------------------------------------------------------
   4. MODAL DE PRODUTO
   --------------------------------------------------------------------- */
function openProductModal(id) {
    const product = DEMO_PRODUCTS.find(p => p.id === id);
    if (!product) return;

    document.getElementById("modal-product-img").src = product.image;
    document.getElementById("modal-product-img").alt = product.name;
    document.getElementById("modal-product-cat").textContent = product.category;
    document.getElementById("modal-product-name").textContent = product.name;
    document.getElementById("modal-product-price").textContent = product.priceLabel;
    document.getElementById("modal-product-desc").textContent = product.shortDesc;

    document.getElementById("modal-product-variants").innerHTML = product.variants.map(v =>
        `<span class="px-3 py-1 rounded-full bg-white border border-brand-obsidian/15 font-mono text-xs">${v}</span>`
    ).join("");

    document.getElementById("modal-whatsapp-btn").onclick = () => {
        closeProductModal();
        openWhatsAppDrawer(`Olá! Gostaria de consultar disponibilidade da peça: ${product.name}`);
    };

    const modal = document.getElementById("product-modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function closeProductModal() {
    const modal = document.getElementById("product-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

/* ---------------------------------------------------------------------
   5. GAVETA DE WHATSAPP
   --------------------------------------------------------------------- */
function openWhatsAppDrawer(contextText) {
    const msg = contextText.startsWith("Olá")
        ? contextText
        : `Olá! Vim pelo site institucional da marca e gostaria de atendimento (${contextText}).`;

    document.getElementById("whatsapp-prefill-text").value = msg;
    const phone = BRAND_CONFIG.whatsappNumber.replace(/\D/g, "");
    const url = phone
        ? `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
        : `https://wa.me/?text=${encodeURIComponent(msg)}`;
    document.getElementById("whatsapp-external-link").href = url;

    const drawer = document.getElementById("whatsapp-drawer");
    drawer.classList.remove("hidden");
    drawer.classList.add("flex");
}

function closeWhatsAppDrawer() {
    const drawer = document.getElementById("whatsapp-drawer");
    drawer.classList.add("hidden");
    drawer.classList.remove("flex");
    document.getElementById("copy-toast").classList.add("hidden");
}

function copyWhatsAppMessage() {
    const textarea = document.getElementById("whatsapp-prefill-text");
    textarea.select();
    document.execCommand("copy");
    document.getElementById("copy-toast").classList.remove("hidden");
}

/* ---------------------------------------------------------------------
   6. EDIÇÃO DE PRÉVIA DA MARCA E FORMULÁRIO DE CONTATO
   --------------------------------------------------------------------- */

// Edição rápida de prévia da história da marca
function enableInlineBrandEdit() {
    const story = document.getElementById("brand-story-text");
    const proposal = document.getElementById("brand-proposal-text");
    const isEditable = story.isContentEditable;

    story.contentEditable = !isEditable;
    proposal.contentEditable = !isEditable;

    if (!isEditable) {
        story.classList.add("ring-2", "ring-brand-terracotta", "p-2", "rounded-lg");
        proposal.classList.add("ring-2", "ring-brand-terracotta", "p-2", "rounded-lg");
        story.focus();
    } else {
        story.classList.remove("ring-2", "ring-brand-terracotta", "p-2", "rounded-lg");
        proposal.classList.remove("ring-2", "ring-brand-terracotta", "p-2", "rounded-lg");
    }
}

function handleContactSubmit(event) {
    event.preventDefault();
    document.getElementById("contact-feedback").classList.remove("hidden");
    event.target.reset();
}

/* ---------------------------------------------------------------------
   7. MODAIS INFORMATIVOS
   --------------------------------------------------------------------- */
function openPrivacyModal() {
    document.getElementById("info-modal-title").textContent = "Política de Privacidade";
    document.getElementById("info-modal-body").innerHTML = `
        <p><strong>1. Coleta de Informações:</strong> Este site coleta apenas os dados fornecidos voluntariamente pelo visitante no formulário de contato (nome, telefone e mensagem) com a finalidade exclusiva de atendimento comercial.</p>
        <p><strong>2. Uso e Compartilhamento:</strong> As informações enviadas não são comercializadas nem cedidas a terceiros alheios ao atendimento da marca.</p>
        <p><strong>3. Direitos do Titular (LGPD):</strong> O visitante pode solicitar a atualização ou exclusão de seus dados de contato a qualquer momento pelos canais oficiais informados no rodapé.</p>
        <p class="text-xs text-brand-terracotta"><em>Nota: Adapte este texto conforme os dados jurídicos (CNPJ e encarregado de dados) da empresa antes da publicação.</em></p>
    `;
    document.getElementById("info-modal").classList.remove("hidden");
    document.getElementById("info-modal").classList.add("flex");
}

function toggleEditGuide() {
    document.getElementById("info-modal-title").textContent = "Checklist de Personalização da Marca";
    document.getElementById("info-modal-body").innerHTML = `
        <p>Esta estrutura foi projetada para evitar dados fictícios e facilitar a inserção do material oficial da loja:</p>
        <ul class="list-disc pl-5 space-y-2">
            <li><strong>Identidade &amp; Logotipo:</strong> Substitua <code>[SUA MARCA]</code> e o monograma no cabeçalho e rodapé pelo logotipo oficial em SVG ou PNG transparente.</li>
            <li><strong>Fotografias Reais:</strong> Troque as imagens editoriais de apoio pelas fotos reais dos ensaios e looks da marca.</li>
            <li><strong>Vitrine de Produtos:</strong> Atualize o array <code>DEMO_PRODUCTS</code> em <code>assets/js/products-data.js</code> com os produtos reais, grades de tamanho e preços (quando aplicável).</li>
            <li><strong>História da Marca:</strong> Preencha os campos da seção <em>Identidade &amp; Essência</em> com a história verdadeira da empresa.</li>
            <li><strong>Canais Oficiais:</strong> Insira o número real do WhatsApp em <code>BRAND_CONFIG.whatsappNumber</code> (<code>assets/js/brand-config.js</code>), o @ oficial do Instagram, endereço e horários de funcionamento.</li>
        </ul>
    `;
    document.getElementById("info-modal").classList.remove("hidden");
    document.getElementById("info-modal").classList.add("flex");
}

function closeInfoModal() {
    document.getElementById("info-modal").classList.add("hidden");
    document.getElementById("info-modal").classList.remove("flex");
}

/* ---------------------------------------------------------------------
   8. ANIMAÇÃO DE REVELAÇÃO AO ROLAR
   --------------------------------------------------------------------- */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal-up").forEach(el => observer.observe(el));
}
