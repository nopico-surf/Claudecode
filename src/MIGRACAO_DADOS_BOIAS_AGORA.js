// ═══════════════════════════════════════════════════════════════════════════
// SCRIPT DE MIGRAÇÃO - DADOS ANTIGOS → NOVAS CHAVES
// ═══════════════════════════════════════════════════════════════════════════

console.clear();
console.log("%c════════════════════════════════════════════════", "color: #ffc72c; font-weight: bold; font-size: 16px");
console.log("%c🔄 MIGRAÇÃO DE DADOS PNBOIA", "color: #00bfff; font-weight: bold; font-size: 18px");
console.log("%c════════════════════════════════════════════════", "color: #ffc72c; font-weight: bold; font-size: 16px");
console.log("");

const BASE = "https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o";

const BUOYS = [
  'pnboia-rio-grande', 'pnboia-florianopolis', 'pnboia-itajai', 'pnboia-santos',
  'pnboia-rio-de-janeiro', 'pnboia-arraial-do-cabo', 'pnboia-vitoria', 'pnboia-salvador',
  'pnboia-ilheus', 'pnboia-recife', 'pnboia-natal', 'pnboia-fortaleza',
  'pnboia-sao-luis', 'pnboia-santarem'
];

async function migrarDados() {
  console.log("%c📋 Verificando dados antigos...", "color: #00bfff; font-weight: bold");
  console.log("");
  
  // OPÇÃO 1: Forçar sincronização nova (MAIS SIMPLES)
  console.log("%c🔄 Forçando sincronização completa...", "color: #ffc72c; font-weight: bold");
  
  try {
    const response = await fetch(`${BASE}/pnboia/sync-all`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${TOKEN}` }
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log("%c✅ SINCRONIZAÇÃO COMPLETA!", "color: #00ff00; font-weight: bold; font-size: 16px");
      console.log("");
      
      if (result.buoys) {
        const real = result.buoys.filter(b => b.source !== "mock").length;
        const mock = result.buoys.filter(b => b.source === "mock").length;
        
        console.log("%c📊 RESULTADO:", "color: #ffc72c; font-weight: bold; font-size: 14px");
        console.log(`%c   🟢 Boias com dados REAIS: ${real}`, "color: #00ff00; font-weight: bold");
        console.log(`%c   🔵 Boias com fallback MOCK: ${mock}`, "color: #0099ff; font-weight: bold");
        console.log("");
        
        console.log("%c✅ Detalhes por boia:", "color: #ffc72c");
        result.buoys.forEach(b => {
          const emoji = b.source === "mock" ? "🔵" : "🟢";
          console.log(`   ${emoji} ${b.buoyId}: ${b.source}`);
        });
      }
      
      console.log("");
      console.log("%c════════════════════════════════════════════════", "color: #ffc72c; font-weight: bold; font-size: 16px");
      console.log("%c🎉 MIGRAÇÃO CONCLUÍDA!", "color: #00ff00; font-weight: bold; font-size: 18px");
      console.log("%c   Atualize a página do admin para ver os dados", "color: #00ff00; font-weight: bold");
      console.log("%c════════════════════════════════════════════════", "color: #ffc72c; font-weight: bold; font-size: 16px");
      
    } else {
      console.log("%c❌ ERRO na sincronização", "color: #ff0000; font-weight: bold");
      const errorText = await response.text();
      console.log("   Erro:", errorText);
    }
    
  } catch (error) {
    console.log("%c💥 ERRO:", "color: #ff0000; font-weight: bold", error.message);
  }
}

migrarDados();
