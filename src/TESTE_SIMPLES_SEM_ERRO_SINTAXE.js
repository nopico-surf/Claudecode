// ═══════════════════════════════════════════════════════════════════════════
// SCRIPT DE TESTE ULTRA SIMPLES - SEM ERROS DE SINTAXE
// ═══════════════════════════════════════════════════════════════════════════

console.clear();
console.log("========================================");
console.log("TESTE PNBOIA v1.5.1 - MOCK FALLBACK");
console.log("========================================\n");

const BASE = "https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o";

async function testar() {
  console.log("AGUARDE 2-3 MINUTOS para o servidor atualizar...\n");
  
  // FASE 1: SINCRONIZAR
  console.log("========== FASE 1: SINCRONIZACAO ==========\n");
  console.log("Sincronizando todas as boias...");
  console.log("(Isso leva 30-60 segundos - AGUARDE!)\n");
  
  try {
    const inicio = Date.now();
    const respSync = await fetch(BASE + "/pnboia/sync-all", {
      method: "POST",
      headers: { "Authorization": "Bearer " + TOKEN }
    });
    const duracao = ((Date.now() - inicio) / 1000).toFixed(1);
    
    console.log("Tempo: " + duracao + "s");
    console.log("Status: " + respSync.status + " " + respSync.statusText);
    
    if (respSync.ok) {
      const dados = await respSync.json();
      console.log("\nRESULTADO:");
      console.log("Total: " + (dados.summary.success + dados.summary.failed));
      console.log("Sucesso: " + dados.summary.success);
      console.log("Falhas: " + dados.summary.failed);
      
      if (dados.results) {
        const reais = dados.results.filter(function(b) { 
          return b.method === "api" || b.method === "scraping"; 
        }).length;
        const mocks = dados.results.filter(function(b) { 
          return b.method === "mock"; 
        }).length;
        
        console.log("\nDETALHES:");
        console.log("Dados REAIS: " + reais);
        console.log("Dados MOCK: " + mocks);
        
        if (reais > 0) {
          console.log("\nBOIAS COM DADOS REAIS:");
          dados.results.forEach(function(b) {
            if (b.method === "api" || b.method === "scraping") {
              console.log("  - " + b.buoyId + ": " + b.method.toUpperCase());
            }
          });
        }
      }
      
    } else {
      console.log("ERRO: " + await respSync.text());
    }
    
  } catch (erro) {
    console.log("ERRO: " + erro.message);
  }
  
  console.log("\n========== FASE 2: VALIDACAO ==========\n");
  console.log("Verificando status das boias...\n");
  
  try {
    const respStatus = await fetch(BASE + "/pnboia/status", {
      headers: { "Authorization": "Bearer " + TOKEN }
    });
    
    console.log("Status: " + respStatus.status + " " + respStatus.statusText);
    
    if (respStatus.ok) {
      const dados = await respStatus.json();
      console.log("\nRESUMO:");
      console.log("Total: " + dados.total);
      console.log("Ativas: " + dados.active);
      console.log("Offline: " + dados.offline);
      
      if (dados.active > 0) {
        console.log("\nBOIAS ATIVAS:");
        dados.buoys.forEach(function(b) {
          if (b.status === "active") {
            const idade = (b.dataAgeMinutes / 60).toFixed(1);
            console.log("  - " + b.buoyId + ": " + idade + "h atras");
          }
        });
      }
      
    } else {
      console.log("ERRO: Endpoint ainda retorna 404");
      console.log("AGUARDE mais 1 minuto e execute novamente");
    }
    
  } catch (erro) {
    console.log("ERRO: " + erro.message);
  }
  
  console.log("\n========================================");
  console.log("\nPROXIMOS PASSOS:");
  console.log("");
  console.log("1. Se aparecem 14 boias ATIVAS com MOCK:");
  console.log("   - Sistema funcionando com dados simulados");
  console.log("   - APIs externas (GOOS Brasil) estao offline");
  console.log("   - Atualize a pagina do admin (F5)");
  console.log("");
  console.log("2. Se ainda mostra 0 boias ativas:");
  console.log("   - Aguarde mais 1-2 minutos");
  console.log("   - Execute este script novamente");
  console.log("");
  console.log("3. Se aparecem boias com dados REAIS:");
  console.log("   - PARABENS! APIs externas voltaram");
  console.log("   - Sistema funcionando perfeitamente");
  console.log("\n========================================");
}

testar();
