// COPIAR E COLAR NO CONSOLE DO NAVEGADOR (F12)
// Este código verifica o HTML que www.nopico.com.br está servindo

(async () => {
  console.log('═'.repeat(60))
  console.log('🔍 VERIFICANDO HTML DO www.nopico.com.br...')
  console.log('═'.repeat(60))
  
  try {
    // Busca o HTML do site com cache desabilitado
    const response = await fetch('https://www.nopico.com.br/', {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    })
    
    const html = await response.text()
    
    console.log('\n📄 ANALISANDO <head>...\n')
    
    // Extrai só o <head>
    const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i)
    
    if (!headMatch) {
      console.error('❌ Não conseguiu encontrar <head> no HTML!')
      console.log('ℹ️  Mostrando início do HTML:\n')
      console.log(html.substring(0, 500))
      return
    }
    
    const head = headMatch[1]
    
    // Verifica cada meta tag importante
    const checks = {
      'Meta description': head.includes('meta name="description"'),
      'Open Graph og:url': head.includes('property="og:url"'),
      'Open Graph og:title': head.includes('property="og:title"'),
      'Open Graph og:description': head.includes('property="og:description"'),
      'Twitter card': head.includes('twitter:card'),
      'Twitter url': head.includes('twitter:url'),
      'Canonical URL': head.includes('rel="canonical"'),
    }
    
    console.log('✅/❌ RESULTADOS:')
    console.log('─'.repeat(60))
    
    for (const [name, found] of Object.entries(checks)) {
      console.log(`${found ? '✅' : '❌'} ${name}`)
    }
    
    console.log('─'.repeat(60))
    
    // Conta quantas passaram
    const passed = Object.values(checks).filter(v => v).length
    const total = Object.keys(checks).length
    
    console.log(`\n📊 RESULTADO: ${passed}/${total} checks passaram\n`)
    
    if (passed === total) {
      console.log('🎉 PERFEITO! Todas as meta tags estão no HTML!')
      console.log('✅ O site www.nopico.com.br está correto!')
      console.log('\n🌐 Agora você pode compartilhar:')
      console.log('   WhatsApp, Facebook, Twitter, etc.')
    } else {
      console.log('⚠️ PROBLEMA ENCONTRADO!')
      console.log('❌ O HTML no www.nopico.com.br NÃO tem todas as meta tags')
      console.log('\n🔍 Mostrando as primeiras linhas do <head>:\n')
      console.log(head.substring(0, 1000))
      console.log('\n📍 ONDE ESTÁ O PROBLEMA:')
      
      if (!checks['Open Graph og:url']) {
        console.log('   ❌ Falta: <meta property="og:url" content="https://www.nopico.com.br/">')
      }
      if (!checks['Canonical URL']) {
        console.log('   ❌ Falta: <link rel="canonical" href="https://www.nopico.com.br/">')
      }
      if (!checks['Twitter card']) {
        console.log('   ❌ Falta: <meta name="twitter:card" content="...">')
      }
      
      console.log('\n💡 POSSÍVEIS CAUSAS:')
      console.log('   1. Figma Make ainda não publicou a versão nova')
      console.log('   2. DNS ainda está apontando para servidor antigo')
      console.log('   3. Cache do Cloudflare/CDN')
    }
    
    // Verifica se é um SPA (React)
    const isSPA = html.includes('<div id="root"></div>')
    console.log(`\n🔧 Tipo de app: ${isSPA ? 'SPA (React)' : 'HTML estático'}`)
    
    if (isSPA) {
      console.log('ℹ️  Como é um SPA, as meta tags devem estar no index.html inicial')
    }
    
    // Mostra headers importantes
    console.log('\n📋 HEADERS DA RESPOSTA:')
    console.log('─'.repeat(60))
    console.log('Server:', response.headers.get('server') || 'N/A')
    console.log('X-Vercel-ID:', response.headers.get('x-vercel-id') || 'N/A')
    console.log('X-Served-By:', response.headers.get('x-served-by') || 'N/A')
    console.log('CF-Ray:', response.headers.get('cf-ray') || 'N/A')
    console.log('─'.repeat(60))
    
    console.log('\n═'.repeat(60))
    
  } catch (error) {
    console.error('❌ Erro ao buscar HTML:', error)
  }
})()

// RESULTADO ESPERADO:
// ✅ Meta description
// ✅ Open Graph og:url
// ✅ Open Graph og:title
// ✅ Open Graph og:description
// ✅ Twitter card
// ✅ Twitter url
// ✅ Canonical URL
// 
// 📊 RESULTADO: 7/7 checks passaram
// 🎉 PERFEITO! Todas as meta tags estão no HTML!
