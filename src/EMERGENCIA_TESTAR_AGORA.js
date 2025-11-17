// ═══════════════════════════════════════════════════════════════════════════
// SCRIPT DE EMERGÊNCIA - AGUARDAR 2 MINUTOS E TESTAR
// ═══════════════════════════════════════════════════════════════════════════

console.clear();
console.log("%c════════════════════════════════════════════════", "color: #ffc72c; font-weight: bold; font-size: 16px");
console.log("%c🆘 TESTE DE EMERGÊNCIA - PNBOIA", "color: #ff0000; font-weight: bold; font-size: 18px");
console.log("%c════════════════════════════════════════════════", "color: #ffc72c; font-weight: bold; font-size: 16px");
console.log("");

const BASE = "https://rqgubpqniscyoojkwltn.supabase.co/functions/v1/make-server-2d5da22b";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o";

async function testarTudo() {
  console.log("%c⏱️ AGUARDE: Servidor pode levar até 2 minutos para atualizar...", "color: #ff9900; font-weight: bold");
  console.log("");
  
  // TESTE 1: /pnboia/test
  console.log("%c1️⃣ Testando /pnboia/test...", "color: #00bfff; font-weight: bold");
  try {
    const r1 = await fetch(`${BASE}/pnboia/test`, {
      headers: { "Authorization": `Bearer ${TOKEN}` }
    });
    console.log(`   Status: ${r1.status} ${r1.statusText}`);
    if (r1.ok) {
      const d1 = await r1.json();
      console.log("%c   ✅ SUCESSO!", "color: #00ff00; font-weight: bold");
    } else {
      console.log("%c   ❌ FALHOU", "color: #ff0000; font-weight: bold");
    }
  } catch (e) {
    console.log("%c   💥 ERRO:", "color: #ff0000; font-weight: bold", e.message);
  }
  console.log("");
  
  // TESTE 2: /pnboia/status
  console.log("%c2️⃣ Testando /pnboia/status...", "color: #00bfff; font-weight: bold");
  try {
    const r2 = await fetch(`${BASE}/pnboia/status`, {
      headers: { "Authorization": `Bearer ${TOKEN}` }
    });
    console.log(`   Status: ${r2.status} ${r2.statusText}`);
    if (r2.ok) {
      const d2 = await r2.json();
      console.log("%c   ✅ SUCESSO!", "color: #00ff00; font-weight: bold");
      console.log(`   Total: ${d2.total} | Ativas: ${d2.active} | Offline: ${d2.offline}`);
    } else {
      console.log("%c   ❌ AINDA RETORNANDO 404", "color: #ff0000; font-weight: bold");
      console.log("   → AGUARDE MAIS 1 MINUTO E EXECUTE DE NOVO");
    }
  } catch (e) {
    console.log("%c   💥 ERRO:", "color: #ff0000; font-weight: bold", e.message);
  }
  console.log("");
  
  // TESTE 3: /pnboia/data
  console.log("%c3️⃣ Testando /pnboia/data...", "color: #00bfff; font-weight: bold");
  try {
    const r3 = await fetch(`${BASE}/pnboia/data`, {
      headers: { "Authorization": `Bearer ${TOKEN}` }
    });
    console.log(`   Status: ${r3.status} ${r3.statusText}`);
    if (r3.ok) {
      const d3 = await r3.json();
      console.log("%c   ✅ SUCESSO!", "color: #00ff00; font-weight: bold");
      console.log(`   Total: ${d3.total} | Ativas: ${d3.active}`);
      
      const reais = d3.buoys.filter(b => b.isMockData === false).length;
      const mocks = d3.buoys.filter(b => b.isMockData === true).length;
      
      console.log("");
      console.log("%c   📊 QUALIDADE DOS DADOS:", "color: #ffc72c; font-weight: bold");
      console.log(`%c   🟢 REAIS: ${reais}`, "color: #00ff00; font-weight: bold; font-size: 14px");
      console.log(`%c   🔵 MOCK: ${mocks}`, "color: #0099ff; font-weight: bold; font-size: 14px");
    } else {
      console.log("%c   ❌ FALHOU", "color: #ff0000; font-weight: bold");
    }
  } catch (e) {
    console.log("%c   💥 ERRO:", "color: #ff0000; font-weight: bold", e.message);
  }
  console.log("");
  
  // TESTE 4: /pnboia/statistics
  console.log("%c4️⃣ Testando /pnboia/statistics...", "color: #00bfff; font-weight: bold");
  try {
    const r4 = await fetch(`${BASE}/pnboia/statistics`, {
      headers: { "Authorization": `Bearer ${TOKEN}` }
    });
    console.log(`   Status: ${r4.status} ${r4.statusText}`);
    if (r4.ok) {
      const d4 = await r4.json();
      console.log("%c   ✅ SUCESSO!", "color: #00ff00; font-weight: bold");
    } else {
      console.log("%c   ❌ AINDA RETORNANDO 404", "color: #ff0000; font-weight: bold");
      console.log("   → AGUARDE MAIS 1 MINUTO E EXECUTE DE NOVO");
    }
  } catch (e) {
    console.log("%c   💥 ERRO:", "color: #ff0000; font-weight: bold", e.message);
  }
  console.log("");
  
  console.log("%c════════════════════════════════════════════════", "color: #ffc72c; font-weight: bold; font-size: 16px");
  console.log("%c💡 SE AINDA DER 404, AGUARDE MAIS 1 MINUTO", "color: #ff9900; font-weight: bold; font-size: 14px");
  console.log("%c   E EXECUTE ESTE SCRIPT NOVAMENTE", "color: #ff9900; font-weight: bold; font-size: 14px");
  console.log("%c════════════════════════════════════════════════", "color: #ffc72c; font-weight: bold; font-size: 16px");
}

testarTudo();
