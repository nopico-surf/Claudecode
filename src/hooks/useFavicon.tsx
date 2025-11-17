import { useEffect } from 'react';

/**
 * Hook para injetar favicon dinamicamente no <head>
 * Resolve o problema de /public não servir arquivos estáticos corretamente
 */
export function useFavicon(faviconUrl: string) {
  useEffect(() => {
    // Remover favicons existentes
    const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
    existingFavicons.forEach(link => link.remove());

    // Adicionar novo favicon SVG
    const linkSvg = document.createElement('link');
    linkSvg.rel = 'icon';
    linkSvg.type = 'image/svg+xml';
    linkSvg.href = faviconUrl;
    document.head.appendChild(linkSvg);

    // Adicionar shortcut icon (fallback)
    const linkShortcut = document.createElement('link');
    linkShortcut.rel = 'shortcut icon';
    linkShortcut.href = faviconUrl;
    document.head.appendChild(linkShortcut);

    // Adicionar apple-touch-icon
    const linkApple = document.createElement('link');
    linkApple.rel = 'apple-touch-icon';
    linkApple.href = faviconUrl;
    document.head.appendChild(linkApple);

    console.log('✅ Favicon injetado dinamicamente:', faviconUrl.substring(0, 50) + '...');
  }, [faviconUrl]);
}
