// Hook para injetar meta tags dinamicamente no <head>
// Solução para Figma Make que gera index.html automático sem meta tags

import { useEffect } from 'react';

interface MetaTag {
  name?: string;
  property?: string;
  content: string;
  key: string;
}

interface LinkTag {
  rel: string;
  href: string;
  key: string;
}

export function useMetaTags() {
  useEffect(() => {
    // 🎯 Define a URL base do site
    const siteUrl = 'https://www.nopico.com.br';
    const siteName = 'Nopico - Previsão de ondas por nível de surf';
    const siteDescription = 'Previsão de ondas para todos os picos de surf do Brasil, calibrada com dados reais das boias PNBOIA';

    // 📄 Meta tags a serem injetadas
    const metaTags: MetaTag[] = [
      // Description
      {
        name: 'description',
        content: 'Previsão de ondas por nível de surf - Todos os picos de surf do Brasil',
        key: 'description'
      },
      
      // Open Graph / Facebook
      {
        property: 'og:type',
        content: 'website',
        key: 'og:type'
      },
      {
        property: 'og:url',
        content: `${siteUrl}/`,
        key: 'og:url'
      },
      {
        property: 'og:title',
        content: siteName,
        key: 'og:title'
      },
      {
        property: 'og:description',
        content: siteDescription,
        key: 'og:description'
      },
      {
        property: 'og:site_name',
        content: 'Nopico',
        key: 'og:site_name'
      },
      
      // Twitter
      {
        name: 'twitter:card',
        content: 'summary_large_image',
        key: 'twitter:card'
      },
      {
        name: 'twitter:url',
        content: `${siteUrl}/`,
        key: 'twitter:url'
      },
      {
        name: 'twitter:title',
        content: siteName,
        key: 'twitter:title'
      },
      {
        name: 'twitter:description',
        content: siteDescription,
        key: 'twitter:description'
      }
    ];

    // 🔗 Link tag canonical
    const canonicalTag: LinkTag = {
      rel: 'canonical',
      href: `${siteUrl}/`,
      key: 'canonical'
    };

    // 🚀 Injeta as meta tags no <head>
    const head = document.head;
    const injectedElements: HTMLElement[] = [];

    // Injeta meta tags
    metaTags.forEach(({ name, property, content, key }) => {
      // Remove tag existente se houver
      const existingMeta = property 
        ? head.querySelector(`meta[property="${property}"]`)
        : head.querySelector(`meta[name="${name}"]`);
      
      if (existingMeta) {
        existingMeta.remove();
      }

      // Cria nova meta tag
      const meta = document.createElement('meta');
      if (name) meta.setAttribute('name', name);
      if (property) meta.setAttribute('property', property);
      meta.setAttribute('content', content);
      meta.setAttribute('data-injected', 'true'); // Marca como injetada
      
      head.appendChild(meta);
      injectedElements.push(meta);
    });

    // Injeta canonical link
    const existingCanonical = head.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    const canonical = document.createElement('link');
    canonical.setAttribute('rel', canonicalTag.rel);
    canonical.setAttribute('href', canonicalTag.href);
    canonical.setAttribute('data-injected', 'true');
    
    head.appendChild(canonical);
    injectedElements.push(canonical);

    // 🏷️ Atualiza o título
    const originalTitle = document.title;
    document.title = siteName;

    // Log para debug
    console.log('✅ Meta tags injetadas:', {
      metaTags: metaTags.length,
      canonical: true,
      title: siteName
    });

    // Cleanup: Remove tags injetadas quando componente desmontar
    return () => {
      injectedElements.forEach(element => element.remove());
      document.title = originalTitle;
    };
  }, []); // Executa apenas uma vez no mount
}
