/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TESTE DE VERSÃO + SINCRONIZAÇÃO PNBOIA
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Este script:
 * 1. Verifica qual versão do servidor está rodando
 * 2. Se for v1.6.0 → Roda sync e mostra métodos usados
 * 3. Se for v1.5.1 → Avisa que servidor ainda não atualizou
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

console.log("🔍 VERIFICANDO VERSÃO DO SERVIDOR...\n");

// 1️⃣ VERIFICAR VERSÃO
fetch("https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/version")
  .then(r => r.json())
  .then(versionInfo => {
    console.log("═══════════════════════════════════════════════════════════════");
    console.log("📦 VERSÃO DO SERVIDOR:");
    console.log("═══════════════════════════════════════════════════════════════");
    console.log(`Versão: ${versionInfo.version}`);
    console.log(`Deploy: ${versionInfo.deployTime}`);
    console.log(`Status: ${versionInfo.status}\n`);
    
    console.log("✨ FUNCIONALIDADES:");
    versionInfo.features.forEach(f => console.log(`  ${f}`));
    console.log("═══════════════════════════════════════════════════════════════\n");
    
    // 2️⃣ VERIFICAR SE É v1.6.0
    if (versionInfo.version === "1.6.0") {
      console.log("✅ SERVIDOR ATUALIZADO! Rodando sincronização...\n");
      
      // 3️⃣ RODAR SYNC
      fetch("https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all", {
        method: "POST",
        headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o" }
      })
      .then(r => r.json())
      .then(data => {
        console.log("═══════════════════════════════════════════════════════════════");
        console.log("📊 RESULTADO DA SINCRONIZAÇÃO:");
        console.log("═══════════════════════════════════════════════════════════════");
        console.log(`Total: ${data.summary.total}`);
        console.log(`Sucesso: ${data.summary.success}`);
        console.log(`Falhas: ${data.summary.failed}\n`);
        
        // 4️⃣ ANALISAR MÉTODOS USADOS
        const methods = {};
        data.results.forEach(r => {
          methods[r.method] = (methods[r.method] || 0) + 1;
        });
        
        console.log("🔬 MÉTODOS UTILIZADOS:");
        console.log("═══════════════════════════════════════════════════════════════");
        
        Object.entries(methods).forEach(([method, count]) => {
          const emoji = method === 'api' ? '🟢' :
                        method === 'scraping' ? '🔵' :
                        method === 'forecast-calibrated' ? '🟠' :
                        method === 'cached-stale' ? '🟡' : '🔴';
          
          const description = method === 'api' ? 'Dados reais API GOOS' :
                             method === 'scraping' ? 'Dados reais scraping' :
                             method === 'forecast-calibrated' ? 'Previsão calibrada (Open-Meteo + histórico) ✨' :
                             method === 'cached-stale' ? 'Dados reais antigos (< 24h)' :
                             method === 'mock' ? 'Mock data (inventado) ⚠️' : method;
          
          console.log(`${emoji} ${method}: ${count} boias`);
          console.log(`   └─ ${description}`);
        });
        
        console.log("═══════════════════════════════════════════════════════════════");
        
        // 5️⃣ VALIDAR SUCESSO
        if (methods['forecast-calibrated'] || methods['cached-stale']) {
          console.log("\n🎉 SUCESSO! Sistema v1.6.0 funcionando perfeitamente!");
          console.log("✅ Usando previsão calibrada ao invés de mock data!");
        } else if (methods['mock']) {
          console.log("\n⚠️ ATENÇÃO: Ainda usando mock data");
          console.log("   Isso é esperado se:");
          console.log("   1. Não há dados PNBOIA reais disponíveis");
          console.log("   2. Não há histórico de bias suficiente");
          console.log("   3. Open-Meteo API está offline");
        }
      })
      .catch(err => {
        console.error("❌ Erro ao sincronizar:", err);
      });
      
    } else {
      console.log("⚠️ SERVIDOR AINDA NA VERSÃO ANTIGA!");
      console.log(`   Versão atual: ${versionInfo.version}`);
      console.log(`   Versão esperada: 1.6.0`);
      console.log("\n⏰ AGUARDE 2-3 MINUTOS e teste novamente.");
      console.log("   O servidor está fazendo redeploy automático...");
    }
  })
  .catch(err => {
    console.error("❌ ERRO AO VERIFICAR VERSÃO:");
    console.error(err);
    console.log("\n💡 POSSÍVEIS CAUSAS:");
    console.log("   1. Servidor ainda não fez redeploy");
    console.log("   2. Endpoint /version ainda não existe (versão antiga)");
    console.log("   3. Edge Function offline");
    console.log("\n⏰ AGUARDE 2-3 MINUTOS e teste novamente.");
  });
