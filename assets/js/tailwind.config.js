/* =====================================================================
   CONFIGURAÇÃO DE IDENTIDADE VISUAL & PALETA (Tailwind CSS)
   Carregado logo após o Tailwind CDN, antes da renderização das classes.
   ===================================================================== */
tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    obsidian: '#121110',    // Preto carvão profundo (Primária escura)
                    espresso: '#241E1B',    // Marrom café editorial (Apoio escuro)
                    sand: '#F4EFEA',        // Areia seda (Fundo claro quente)
                    linen: '#EAE1D6',       // Linho natural (Fundo secundário)
                    terracotta: '#9E472A',  // Terracota queimado (Destaque principal)
                    gold: '#C5A059',        // Ouro fosco (Acento refinado)
                    slate: '#5C5650',       // Cinza quente (Texto secundário)
                }
            },
            fontFamily: {
                serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
                sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
                mono: ['"Space Mono"', 'monospace'],
            },
            animation: {
                'marquee': 'marquee 28s linear infinite',
                'slow-zoom': 'slowZoom 18s ease-in-out infinite alternate',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                slowZoom: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.07)' },
                }
            }
        }
    }
};
