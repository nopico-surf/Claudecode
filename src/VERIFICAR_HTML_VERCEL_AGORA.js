// COPIAR E COLAR NO CONSOLE DO NAVEGADOR (F12)
// Este código verifica o HTML que o VERCEL está servindo

(async () => {
  console.log('═'.repeat(60))
  console.log('🔍 VERIFICANDO HTML DO VERCEL...')
  console.log('═'.repeat(60))
  
  try {
    // Busca o HTML do site com cache desabilitado
    const response = await fetch('https://nopicosurf.vercel.app/', {
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
      console.log('✅ O problema pode ser com www.nopico.com.br')
      console.log('💡 Teste: https://nopicosurf.vercel.app/')
    } else {
      console.log('⚠️ PROBLEMA ENCONTRADO!')
      console.log('❌ O HTML no Vercel NÃO tem todas as meta tags')
      console.log('\n🔍 Mostrando as primeiras linhas do <head>:\n')
      console.log(head.substring(0, 1000))
      console.log('\n💡 SOLUÇÃO: O Figma Make pode estar enviando versão antiga!')
    }
    
    // Verifica se é um SPA (React)
    const isSPA = html.includes('<div id="root"></div>')
    console.log(`\n🔧 Tipo de app: ${isSPA ? 'SPA (React)' : 'HTML estático'}`)
    
    if (isSPA) {
      console.log('ℹ️  Como é um SPA, as meta tags devem estar no index.html inicial')
    }
    
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
