// ═══════════════════════════════════════════════════════════════════════════
// SCRIPT DE TESTE COMPLETO - VERSÃO 1.5.0
// ═══════════════════════════════════════════════════════════════════════════

console.clear();
console.log("%c════════════════════════════════════════════════", "color: #ffc72c; font-weight: bold; font-size: 16px");
console.log("%c🔄 TESTE COMPLETO - PNBOIA v1.5.0", "color: #00bfff; font-weight: bold; font-size: 18px");
console.log("%c════════════════════════════════════════════════", "color: #ffc72c; font-weight: bold; font-size: 16px");
console.log("");

const BASE = "https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o";

async function testarTudo() {
  console.log("%c⏱️ AGUARDE: Servidor pode levar 2-3 minutos para atualizar após edição...", "color: #ff9900; font-weight: bold");
  console.log("");
  
  // ═══════════════════════════════════════════════════════════════════════
  // FASE 1: FORÇAR SINCRONIZAÇÃO COM NOVAS MELHORIAS
  // ═══════════════════════════════════════════════════════════════════════
  
  console.log("%c════════ FASE 1: SINCRONIZAÇÃO ════════", "color: #ffc72c; font-weight: bold; font-size: 16px");
  console.log("");
  
  console.log("%c🔄 Forçando sincronização de todas as boias...", "color: #00bfff; font-weight: bold");
  console.log("%c   (Isso pode levar 30-60 segundos - AGUARDE!)", "color: #ff9900");
  console.log("");
  
  try {
    const syncStart = Date.now();
    const responseSync = await fetch(`${BASE}/pnboia/sync-all`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${TOKEN}` }
    });
    const syncDuration = ((Date.now() - syncStart) / 1000).toFixed(1);
    
    console.log(`%c   ⏱️ Sincronização levou ${syncDuration}s`, "color: #00bfff");
    console.log(`   Status: ${responseSync.status} ${responseSync.statusText}`);
    
    if (responseSync.ok) {
      const resultSync = await responseSync.json();
      console.log("%c   ✅ SINCRONIZAÇÃO COMPLETA!", "color: #00ff00; font-weight: bold; font-size: 16px");
      console.log("");
      
      if (resultSync.buoys) {
        const real = resultSync.buoys.filter(b => b.source === "api" || b.source === "scraping").length;
        const mock = resultSync.buoys.filter(b => b.source === "mock").length;
        const failed = resultSync.buoys.filter(b => b.error).length;
        
        console.log("%c   📊 RESULTADO DA SINCRONIZAÇÃO:", "color: #ffc72c; font-weight: bold; font-size: 14px");
        console.log(`%c      🟢 DADOS REAIS: ${real}`, real > 0 ? "color: #00ff00; font-weight: bold" : "color: #999");
        console.log(`%c      🔵 FALLBACK MOCK: ${mock}`, mock > 0 ? "color: #0099ff; font-weight: bold" : "color: #999");
        console.log(`%c      ❌ FALHAS: ${failed}`, failed > 0 ? "color: #ff0000; font-weight: bold" : "color: #999");
        console.log("");
        
        if (real > 0) {
          console.log("%c   🎉 BOIAS COM DADOS REAIS:", "color: #00ff00; font-weight: bold");
          resultSync.buoys
            .filter(b => b.source === "api" || b.source === "scraping")
            .forEach(b => {
              const emoji = b.source === "api" ? "🟢" : "🔵";
              console.log(`      ${emoji} ${b.buoyId}: ${b.source.toUpperCase()}`);
            });
          console.log("");
        }
        
        if (failed > 0) {
          console.log("%c   ⚠️ BOIAS QUE FALHARAM:", "color: #ff9900; font-weight: bold");
          resultSync.buoys
            .filter(b => b.error)
            .forEach(b => {
              console.log(`      ❌ ${b.buoyId}: ${b.error}`);
            });
          console.log("");
        }
      }
      
    } else {
      console.log("%c   ❌ ERRO na sincronização", "color: #ff0000; font-weight: bold");
      const errorText = await responseSync.text();
      console.log("   Erro:", errorText);
    }
    
  } catch (error) {
    console.log("%c   💥 ERRO:", "color: #ff0000; font-weight: bold", error.message);
  }
  
  console.log("");
  console.log("%c════════ FASE 2: VALIDAÇÃO ════════", "color: #ffc72c; font-weight: bold; font-size: 16px");
  console.log("");
  
  // ═══════════════════════════════════════════════════════════════════════
  // FASE 2: VALIDAR STATUS DAS BOIAS
  // ═══════════════════════════════════════════════════════════════════════
  
  console.log("%c🔍 Validando status das boias...", "color: #00bfff; font-weight: bold");
  
  try {
    const responseStatus = await fetch(`${BASE}/pnboia/status`, {
      headers: { "Authorization": `Bearer ${TOKEN}` }
    });
    
    console.log(`   Status: ${responseStatus.status} ${responseStatus.statusText}`);
    
    if (responseStatus.ok) {
      const dataStatus = await responseStatus.json();
      console.log("%c   ✅ STATUS OK!", "color: #00ff00; font-weight: bold");
      console.log("");
      console.log("%c   📊 RESUMO GERAL:", "color: #ffc72c; font-weight: bold");
      console.log(`      Total: ${dataStatus.total}`);
      console.log(`%c      Ativas: ${dataStatus.active}`, dataStatus.active > 0 ? "color: #00ff00; font-weight: bold" : "color: #999");
      console.log(`%c      Offline: ${dataStatus.offline}`, dataStatus.offline > 0 ? "color: #ff9900" : "color: #999");
      console.log("");
      
      if (dataStatus.active > 0) {
        console.log("%c   🎉 BOIAS ATIVAS:", "color: #00ff00; font-weight: bold");
        dataStatus.buoys
          .filter(b => b.status === 'active')
          .forEach(b => {
            const age = (b.dataAgeMinutes / 60).toFixed(1);
            console.log(`      🟢 ${b.buoyId}: ${age}h atrás`);
          });
      }
      
    } else {
      console.log("%c   ❌ ENDPOINT /status AINDA RETORNANDO 404", "color: #ff0000; font-weight: bold");
      console.log("   → AGUARDE MAIS 1 MINUTO E EXECUTE DE NOVO");
    }
    
  } catch (error) {
    console.log("%c   💥 ERRO:", "color: #ff0000; font-weight: bold", error.message);
  }
  
  console.log("");
  console.log("%c════════════════════════════════════════════════", "color: #ffc72c; font-weight: bold; font-size: 16px");
  console.log("");
  
  // ═══════════════════════════════════════════════════════════════════════
  // RESULTADO FINAL
  // ═══════════════════════════════════════════════════════════════════════
  
  console.log("%c🎯 PRÓXIMOS PASSOS:", "color: #ffc72c; font-weight: bold; font-size: 16px");
  console.log("");
  console.log("%c1️⃣ Se ainda aparece '0/14 boias ativas':", "color: #00bfff; font-weight: bold");
  console.log("   → Aguarde mais 1-2 minutos e execute este script novamente");
  console.log("   → O servidor pode estar fazendo deploy automático");
  console.log("");
  console.log("%c2️⃣ Se aparecem boias ATIVAS:", "color: #00ff00; font-weight: bold");
  console.log("   → Atualize a página do admin (F5)");
  console.log("   → As boias devem aparecer como ONLINE no dashboard");
  console.log("");
  console.log("%c3️⃣ Se TODAS as boias falharam mesmo após correção:", "color: #ff9900; font-weight: bold");
  console.log("   → As APIs externas (GOOS Brasil) podem estar offline");
  console.log("   → O site da Marinha pode ter mudado completamente");
  console.log("   → Nesse caso, precisaremos de MOCK data temporário");
  console.log("");
  console.log("%c════════════════════════════════════════════════", "color: #ffc72c; font-weight: bold; font-size: 16px");
}

testarTudo();
