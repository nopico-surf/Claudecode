/**
 * ═══════════════════════════════════════════════════════════════════════════
 * VERCEL BACKEND CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Configuração para usar Vercel Serverless Functions como backend primário
 * para scraping de dados PNBOIA.
 * 
 * VANTAGENS DO VERCEL:
 * ✅ Timeout: 60s (vs Supabase 15s)
 * ✅ HTTP permitido (vs bloqueado no Supabase)
 * ✅ CORS: Servidor→Servidor (sem bloqueios)
 * ✅ Node.js completo (mais libraries)
 * ✅ Proxies CORS integrados (allorigins, corsproxy)
 * 
 * ARQUITETURA:
 * Frontend → Vercel Functions → PNBOIA APIs
 *         ↓ (fallback se falhar)
 *         → Supabase Edge Function → PNBOIA APIs
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ========================================
// CONFIGURAÇÃO
// ========================================

/**
 * URL base do Vercel
 * 
 * Usa o domínio personalizado: www.nopico.com.br
 */
export const VERCEL_PROJECT_URL = 'https://www.nopico.com.br';

/**
 * URL completa da API Vercel
 */
export const VERCEL_API_URL = `${VERCEL_PROJECT_URL}/api`;

/**
 * Toggle para ativar/desativar Vercel
 * 
 * TRUE = Usa Vercel como primário (Supabase como fallback)
 * FALSE = Usa apenas Supabase
 * 
 * ✅ ATIVADO: Build script move /src/api → /api durante deploy
 */
export const USE_VERCEL_BACKEND = true;

/**
 * Timeout para chamadas ao Vercel (ms)
 * Vercel tem timeout de 60s, mas colocamos 55s para ter margem
 */
export const VERCEL_TIMEOUT_MS = 55000; // 55 segundos

/**
 * Retry automático se Vercel falhar?
 */
export const VERCEL_AUTO_RETRY = true;

/**
 * Número de tentativas antes de fazer fallback para Supabase
 */
export const VERCEL_MAX_RETRIES = 1;

// ========================================
// HELPERS
// ========================================

/**
 * Verifica se estamos em produção
 */
export function isProduction(): boolean {
  return window.location.hostname !== 'localhost' && 
         window.location.hostname !== '127.0.0.1';
}

/**
 * Verifica se deve usar Vercel baseado no ambiente
 */
export function shouldUseVercel(): boolean {
  // Se toggle está OFF, não usar
  if (!USE_VERCEL_BACKEND) {
    return false;
  }
  
  // Em desenvolvimento local, pode testar Vercel se quiser
  // (descomente a linha abaixo para forçar Supabase em dev)
  // if (!isProduction()) return false;
  
  return true;
}

/**
 * Retorna a URL correta baseado no ambiente
 */
export function getVercelApiUrl(): string {
  return VERCEL_API_URL;
}

// ========================================
// LOGGING
// ========================================

/**
 * Log de uso do Vercel (para debug)
 */
export function logVercelUsage(action: 'attempt' | 'success' | 'failure', details?: string) {
  const prefix = '[VERCEL]';
  const timestamp = new Date().toISOString();
  
  switch (action) {
    case 'attempt':
      console.log(`${prefix} 🔵 Tentando Vercel... ${details || ''}`);
      break;
    case 'success':
      console.log(`${prefix} ✅ Vercel OK! ${details || ''}`);
      break;
    case 'failure':
      console.warn(`${prefix} ⚠️ Vercel falhou: ${details || ''}`);
      break;
  }
}

// ========================================
// EXPORT DEFAULT
// ========================================

export default {
  VERCEL_API_URL,
  VERCEL_PROJECT_URL,
  USE_VERCEL_BACKEND,
  VERCEL_TIMEOUT_MS,
  VERCEL_AUTO_RETRY,
  VERCEL_MAX_RETRIES,
  shouldUseVercel,
  getVercelApiUrl,
  isProduction,
  logVercelUsage
};
