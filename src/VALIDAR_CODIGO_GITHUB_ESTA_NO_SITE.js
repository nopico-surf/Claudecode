// ═══════════════════════════════════════════════════════════════════
// 🧪 TESTE: Validar se o código do GitHub está sendo usado no site
// ═══════════════════════════════════════════════════════════════════
// 
// 📍 COMO USAR:
// 1. Clicar em "Publish" no Figma Make
// 2. Aguardar 30-60 segundos
// 3. Abrir: https://www.nopico.com.br/
// 4. Apertar F12 → Console
// 5. Copiar e colar ESTE código abaixo
// 6. Apertar Enter
//
// ═══════════════════════════════════════════════════════════════════

(async () => {
  console.clear()
  console.log('═'.repeat(60))
  console.log('🧪 TESTE: Validação do Código GitHub → Site Final')
  console.log('═'.repeat(60))
  console.log('')
  
  // ═══════════════════════════════════════════════════════════════
  // TESTE 1: Procurar a mensagem de validação no console
  // ═══════════════════════════════════════════════════════════════
  
  console.log('📋 TESTE 1: Mensagem de validação no console')
  console.log('─'.repeat(60))
  console.log('🔍 Procurando por: "VALIDACAO-CODIGO: v2.7.0-TESTE-15NOV2025-1837"')
  console.log('')
  console.log('⚠️  IMPORTANTE: Veja acima no console se apareceu:')
  console.log('   🧪 VALIDACAO-CODIGO: v2.7.0-TESTE-15NOV2025-1837-GITHUB-ATIVO')
  console.log('   ✅ Se você está vendo esta mensagem...')
  console.log('')
  
  // Aguarda 2 segundos para o usuário olhar
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // ═══════════════════════════════════════════════════════════════
  // TESTE 2: Verificar código-fonte do JavaScript carregado
  // ═══════════════════════════════════════════════════════════════
  
  console.log('📋 TESTE 2: Código-fonte JavaScript')
  console.log('─'.repeat(60))
  
  try {
    // Pega todos os scripts da página
    const scripts = Array.from(document.querySelectorAll('script'))
    console.log(`📦 Total de scripts encontrados: ${scripts.length}`)
    
    // Procura por scripts com src (externos)
    const externalScripts = scripts.filter(s => s.src)
    console.log(`📦 Scripts externos: ${externalScripts.length}`)
    
    console.log('')
    console.log('🔍 URLs dos scripts principais:')
    externalScripts.forEach((script, i) => {
      const url = script.src
      if (url.includes('App') || url.includes('main') || url.includes('index')) {
        console.log(`   ${i + 1}. ${url}`)
      }
    })
    
  } catch (error) {
    console.log('⚠️  Erro ao analisar scripts:', error)
  }
  
  console.log('')
  
  // ═══════════════════════════════════════════════════════════════
  // TESTE 3: Verificar versão no HTML
  // ═══════════════════════════════════════════════════════════════
  
  console.log('📋 TESTE 3: Fetch do HTML e busca por versão')
  console.log('─'.repeat(60))
  
  try {
    const response = await fetch('https://www.nopico.com.br/', {
      method: 'GET',
      cache: 'no-cache', // Força buscar versão mais recente
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    })
    
    const html = await response.text()
    
    // Procura pela string de validação
    const hasValidation = html.includes('v2.7.0-TESTE-15NOV2025-1837')
    const hasOldVersion = html.includes('v2.6.0')
    const hasMetaTags = html.includes('og:url')
    
    console.log(`🔍 Procurando por "v2.7.0-TESTE-15NOV2025-1837":`)
    console.log(`   ${hasValidation ? '✅' : '❌'} String encontrada no HTML`)
    console.log('')
    console.log(`🔍 Verificando v2.6.0 (versão antiga):`)
    console.log(`   ${hasOldVersion ? '⚠️  AINDA TEM' : '✅ Removida'} v2.6.0 no HTML`)
    console.log('')
    console.log(`🔍 Verificando meta tags og:url:`)
    console.log(`   ${hasMetaTags ? '✅ Presente' : '❌ Ausente'} no HTML`)
    
    console.log('')
    console.log('📄 Primeiras 1000 caracteres do <head>:')
    console.log('─'.repeat(60))
    
    const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)
    if (headMatch) {
      const headContent = headMatch[1].substring(0, 1000)
      console.log(headContent)
    } else {
      console.log('⚠️  Não foi possível extrair o <head>')
    }
    
  } catch (error) {
    console.log('❌ Erro ao buscar HTML:', error)
  }
  
  console.log('')
  console.log('═'.repeat(60))
  
  // ═══════════════════════════════════════════════════════════════
  // RESULTADO FINAL
  // ═══════════════════════════════════════════════════════════════
  
  console.log('📊 INTERPRETAÇÃO DOS RESULTADOS:')
  console.log('─'.repeat(60))
  console.log('')
  console.log('✅ SUCESSO = Ver estas 2 mensagens no console acima:')
  console.log('   1. 🧪 VALIDACAO-CODIGO: v2.7.0-TESTE-15NOV2025-1837-GITHUB-ATIVO')
  console.log('   2. ✅ String encontrada no HTML')
  console.log('')
  console.log('❌ FALHA = Se NÃO aparecer a mensagem de validação:')
  console.log('   • Figma Make ainda não deployou (aguarde 1-2 min)')
  console.log('   • Cache do Cloudflare (pode levar até 5 min)')
  console.log('   • Limpar cache do navegador (Ctrl+Shift+R)')
  console.log('')
  console.log('⚠️  PARCIAL = Mensagem no console MAS não no HTML:')
  console.log('   • Código JS correto, mas HTML desatualizado')
  console.log('   • Aguardar mais 1-2 minutos')
  console.log('')
  console.log('═'.repeat(60))
  console.log('')
  console.log('💬 PRÓXIMO PASSO:')
  console.log('   Se ✅ SUCESSO → Adicionar meta tags no Custom Code')
  console.log('   Se ❌ FALHA → Aguardar e tentar novamente')
  console.log('')
  console.log('═'.repeat(60))
  
})()

// ═══════════════════════════════════════════════════════════════════
// RESUMO: O QUE ESTE TESTE FAZ
// ═══════════════════════════════════════════════════════════════════
// 
// 1. Verifica se há um console.log específico no App.tsx
// 2. Lista os scripts JavaScript carregados
// 3. Faz fetch do HTML e procura pela string "v2.7.0-TESTE-15NOV2025-1837"
// 4. Mostra as primeiras linhas do <head>
// 
// Se a string for encontrada = Código do GitHub está sendo usado! ✅
// Se não for encontrada = Código antigo ou cache ❌
// 
// ═══════════════════════════════════════════════════════════════════
