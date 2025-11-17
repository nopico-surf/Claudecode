/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VERCEL SERVERLESS FUNCTION - PNBOIA SYNC ALL (JAVASCRIPT)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Endpoint: /api/pnboia/sync-all
 * Método: GET
 * 
 * Sincroniza TODAS as 14 boias PNBOIA em paralelo.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

const ALL_BUOYS = [
  'pnboia-rio-grande',
  'pnboia-florianopolis',
  'pnboia-itajai',
  'pnboia-santos',
  'pnboia-rio-de-janeiro',
  'pnboia-arraial-do-cabo',
  'pnboia-vitoria',
  'pnboia-salvador',
  'pnboia-ilheus',
  'pnboia-recife',
  'pnboia-natal',
  'pnboia-fortaleza',
  'pnboia-sao-luis',
  'pnboia-santarem'
];

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Só GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log(`\n🔄 [Vercel] Sincronizando TODAS as ${ALL_BUOYS.length} boias...`);

  const startTime = Date.now();
  const results = [];

  try {
    // Buscar todas as boias EM PARALELO
    const promises = ALL_BUOYS.map(async (buoyId) => {
      try {
        console.log(`[Sync] Buscando ${buoyId}...`);

        // URL base
        const baseUrl = process.env.VERCEL_URL 
          ? `https://${process.env.VERCEL_URL}`
          : 'https://www.nopico.com.br';

        const response = await fetch(`${baseUrl}/api/pnboia/${buoyId}`, {
          signal: AbortSignal.timeout(45000)
        });

        const data = await response.json();

        if (data.success) {
          console.log(`[Sync] ✅ ${buoyId}: ${data.data.waveHeight}m (${data.source})`);
          return {
            buoyId,
            success: true,
            data: data.data,
            source: data.source
          };
        } else {
          console.log(`[Sync] ❌ ${buoyId}: ${data.error}`);
          return {
            buoyId,
            success: false,
            error: data.error
          };
        }

      } catch (error) {
        console.log(`[Sync] ❌ ${buoyId}: ${error.message}`);
        return {
          buoyId,
          success: false,
          error: error.message
        };
      }
    });

    // Aguardar todas
    const allResults = await Promise.allSettled(promises);

    // Processar
    allResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        results.push(result.value);
      } else {
        results.push({
          buoyId: ALL_BUOYS[index],
          success: false,
          error: result.reason?.message || 'Unknown error'
        });
      }
    });

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    // Estatísticas
    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;
    const sources = {
      api: results.filter(r => r.source === 'api').length,
      scraping: results.filter(r => r.source === 'scraping').length,
      'forecast-calibrated': results.filter(r => r.source === 'forecast-calibrated').length
    };

    console.log(`\n📊 [Sync] Resumo:`);
    console.log(`   ✅ Sucesso: ${successCount}/${ALL_BUOYS.length}`);
    console.log(`   ❌ Falhas: ${failCount}/${ALL_BUOYS.length}`);
    console.log(`   📡 API: ${sources.api}`);
    console.log(`   🌐 Scraping: ${sources.scraping}`);
    console.log(`   🧮 Calibrada: ${sources['forecast-calibrated']}`);
    console.log(`   ⏱️ Duração: ${duration}s`);

    return res.status(200).json({
      success: true,
      summary: {
        total: ALL_BUOYS.length,
        successful: successCount,
        failed: failCount,
        duration: `${duration}s`,
        sources
      },
      results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error(`[Sync] Exception:`, error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
};
