// ═══════════════════════════════════════════════════════════════════
// 🧪 TESTE: Verificar se as meta tags foram injetadas pelo React
// ═══════════════════════════════════════════════════════════════════
// 
// 📍 COMO USAR:
// 1. Clicar em "Publish" no Figma Make (botão verde no topo)
// 2. Aguardar 30-60 segundos
// 3. Abrir: https://www.nopico.com.br/
// 4. Apertar F12 → Console
// 5. Copiar e colar ESTE código abaixo
// 6. Apertar Enter
//
// ═══════════════════════════════════════════════════════════════════

(async () => {
  console.log('═'.repeat(60))
  console.log('🧪 TESTE: Meta Tags Injetadas via React')
  console.log('═'.repeat(60))
  console.log('')
  
  // ═══════════════════════════════════════════════════════════════
  // TESTE 1: Verificar meta tags no DOM ATUAL (após React carregar)
  // ═══════════════════════════════════════════════════════════════
  
  console.log('📋 TESTE 1: Meta tags no DOM atual')
  console.log('─'.repeat(60))
  
  const checks = {
    'Meta description': !!document.querySelector('meta[name="description"]'),
    'Open Graph og:url': !!document.querySelector('meta[property="og:url"]'),
    'Open Graph og:title': !!document.querySelector('meta[property="og:title"]'),
    'Open Graph og:description': !!document.querySelector('meta[property="og:description"]'),
    'Open Graph og:site_name': !!document.querySelector('meta[property="og:site_name"]'),
    'Twitter card': !!document.querySelector('meta[name="twitter:card"]'),
    'Twitter url': !!document.querySelector('meta[name="twitter:url"]'),
    'Twitter title': !!document.querySelector('meta[name="twitter:title"]'),
    'Canonical URL': !!document.querySelector('link[rel="canonical"]'),
  }
  
  for (const [name, found] of Object.entries(checks)) {
    console.log(`${found ? '✅' : '❌'} ${name}`)
  }
  
  const passed = Object.values(checks).filter(v => v).length
  const total = Object.keys(checks).length
  
  console.log('─'.repeat(60))
  console.log(`📊 RESULTADO TESTE 1: ${passed}/${total} checks passaram`)
  console.log('')
  
  // ═══════════════════════════════════════════════════════════════
  // TESTE 2: Verificar se tags foram injetadas pelo hook
  // ═══════════════════════════════════════════════════════════════
  
  console.log('📋 TESTE 2: Tags injetadas pelo React')
  console.log('─'.repeat(60))
  
  const injectedTags = document.querySelectorAll('[data-injected="true"]')
  console.log(`✅ Encontradas ${injectedTags.length} tags com data-injected="true"`)
  
  if (injectedTags.length > 0) {
    console.log('')
    console.log('🔍 Tags injetadas:')
    injectedTags.forEach(tag => {
      const tagName = tag.tagName.toLowerCase()
      const key = tag.getAttribute('name') || tag.getAttribute('property') || tag.getAttribute('rel')
      const content = tag.getAttribute('content') || tag.getAttribute('href')
      console.log(`   • <${tagName} ${key}="${content?.substring(0, 50)}...">`)
    })
  }
  
  console.log('')
  
  // ═══════════════════════════════════════════════════════════════
  // TESTE 3: Verificar conteúdo das meta tags
  // ═══════════════════════════════════════════════════════════════
  
  console.log('📋 TESTE 3: Conteúdo das meta tags')
  console.log('─'.repeat(60))
  
  const ogUrl = document.querySelector('meta[property="og:url"]')?.getAttribute('content')
  const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content')
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href')
  const pageTitle = document.title
  
  console.log(`📍 og:url → ${ogUrl || '❌ NÃO ENCONTRADO'}`)
  console.log(`📍 og:title → ${ogTitle || '❌ NÃO ENCONTRADO'}`)
  console.log(`📍 canonical → ${canonical || '❌ NÃO ENCONTRADO'}`)
  console.log(`📍 <title> → ${pageTitle}`)
  
  console.log('')
  
  // ═══════════════════════════════════════════════════════════════
  // RESULTADO FINAL
  // ═══════════════════════════════════════════════════════════════
  
  console.log('═'.repeat(60))
  
  if (passed === total) {
    console.log('🎉 SUCESSO! Todas as meta tags estão presentes!')
    console.log('✅ O hook useMetaTags() está funcionando!')
    console.log('')
    console.log('🌐 Agora você pode testar compartilhamento social:')
    console.log('   1. WhatsApp: Enviar link www.nopico.com.br')
    console.log('   2. Facebook: Colar link e ver preview')
    console.log('   3. Twitter: Colar link e ver card')
    console.log('')
    console.log('🔧 IMPORTANTE: Se não aparecer preview imediatamente:')
    console.log('   • Facebook: https://developers.facebook.com/tools/debug/')
    console.log('   • Twitter: https://cards-dev.twitter.com/validator')
  } else if (injectedTags.length > 0) {
    console.log('⚠️  PARCIAL: Tags injetadas, mas algumas faltam!')
    console.log(`   ${passed}/${total} tags encontradas`)
    console.log('')
    console.log('🔍 Faltam:')
    for (const [name, found] of Object.entries(checks)) {
      if (!found) {
        console.log(`   ❌ ${name}`)
      }
    }
  } else {
    console.log('❌ ERRO: Hook não executou!')
    console.log('')
    console.log('🔍 POSSÍVEIS CAUSAS:')
    console.log('   1. Figma Make ainda não deployou a nova versão')
    console.log('   2. Cache do navegador (Ctrl+Shift+R)')
    console.log('   3. Erro no React (ver console)')
    console.log('')
    console.log('💡 SOLUÇÃO:')
    console.log('   1. Aguardar 1 minuto e recarregar')
    console.log('   2. Limpar cache (Ctrl+Shift+Delete)')
    console.log('   3. Tentar em aba anônima')
  }
  
  console.log('═'.repeat(60))
  
})()

// ═══════════════════════════════════════════════════════════════════
// RESULTADO ESPERADO APÓS PUBLISH:
// ═══════════════════════════════════════════════════════════════════
// 
// ✅ Meta description
// ✅ Open Graph og:url
// ✅ Open Graph og:title
// ✅ Open Graph og:description
// ✅ Open Graph og:site_name
// ✅ Twitter card
// ✅ Twitter url
// ✅ Twitter title
// ✅ Canonical URL
// 
// 📊 RESULTADO TESTE 1: 9/9 checks passaram
// 
// ✅ Encontradas 10 tags com data-injected="true"
// 
// 🎉 SUCESSO! Todas as meta tags estão presentes!
// ═══════════════════════════════════════════════════════════════════
