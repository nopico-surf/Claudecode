/**
 * ═══════════════════════════════════════════════════════════════
 * COMPONENTE: INDICADOR DE STATUS PNBOIA
 * ═══════════════════════════════════════════════════════════════
 * 
 * Mostra o status das boias PNBOIA no canto da tela:
 * - Quantas boias estão ativas
 * - Se está sincronizando
 * - Se houve erro
 * 
 * Útil para verificar rapidamente se o sistema está usando
 * dados reais das boias da Marinha do Brasil.
 * 
 * ═══════════════════════════════════════════════════════════════
 */

import React, { useState } from 'react';
import { Waves, AlertCircle, CheckCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react';

interface PNBOIAStatusIndicatorProps {
  status: {
    isInitialized: boolean;
    lastSync: string | null;
    isLoading: boolean;
    error: string | null;
    buoysActive: number;
    buoysTotal: number;
  };
}

export function PNBOIAStatusIndicator({ status }: PNBOIAStatusIndicatorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calcular taxa de sucesso
  const successRate = status.buoysTotal > 0
    ? Math.round((status.buoysActive / status.buoysTotal) * 100)
    : 0;

  // Determinar cor e ícone baseado no status
  const getStatusColor = () => {
    if (status.error) return 'bg-red-500';
    if (status.isLoading) return 'bg-yellow-500';
    if (successRate >= 80) return 'bg-green-500';
    if (successRate >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusIcon = () => {
    if (status.error) return <AlertCircle className="w-4 h-4" />;
    if (status.isLoading) return <Loader2 className="w-4 h-4 animate-spin" />;
    if (successRate >= 80) return <CheckCircle className="w-4 h-4" />;
    if (successRate >= 50) return <AlertCircle className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
  };

  const getStatusText = () => {
    if (status.error) return 'Erro';
    if (status.isLoading) return 'Carregando...';
    if (successRate >= 80) return 'Dados Reais PNBOIA';
    if (successRate >= 50) return 'Parcial';
    if (successRate === 0) return 'Backend sincronizando...';
    return 'Offline';
  };

  // Formatar última sincronização
  const getLastSyncText = () => {
    if (!status.lastSync) return 'Nunca';
    
    const lastSync = new Date(status.lastSync);
    const now = new Date();
    const diffMs = now.getTime() - lastSync.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Agora';
    if (diffMins < 60) return `${diffMins}min atrás`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h atrás`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d atrás`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Versão minimizada */}
      <div
        className={`
          ${isExpanded ? 'hidden' : 'flex'}
          items-center gap-2 px-3 py-2 rounded-full shadow-lg
          cursor-pointer hover:shadow-xl transition-all
          ${getStatusColor()} text-white
        `}
        onClick={() => setIsExpanded(true)}
      >
        <Waves className="w-4 h-4" />
        <span className="text-sm">{status.buoysActive}/{status.buoysTotal}</span>
        {getStatusIcon()}
      </div>

      {/* Versão expandida */}
      <div
        className={`
          ${isExpanded ? 'block' : 'hidden'}
          bg-white rounded-lg shadow-xl p-4 min-w-[280px]
          border border-gray-200
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-900">Boias PNBOIA</span>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Status */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Status:</span>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${getStatusColor()} bg-opacity-10`}>
              <div className={getStatusColor() + ' w-2 h-2 rounded-full'} />
              <span className="text-xs">{getStatusText()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Boias ativas:</span>
            <span className="text-sm">
              {status.buoysActive}/{status.buoysTotal}
              <span className="text-xs text-gray-500 ml-1">({successRate}%)</span>
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Última sync:</span>
            <span className="text-xs text-gray-900">{getLastSyncText()}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`${getStatusColor()} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${successRate}%` }}
            />
          </div>
        </div>

        {/* Error message */}
        {status.error && (
          <div className="bg-red-50 border border-red-200 rounded p-2 mb-3">
            <p className="text-xs text-red-700">{status.error}</p>
          </div>
        )}

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-3">
          <p className="text-xs text-blue-700">
            {successRate >= 80 && '✅ Previsões usando dados reais das boias da Marinha do Brasil'}
            {successRate >= 50 && successRate < 80 && '⚠️ Algumas boias offline, usando dados parciais'}
            {successRate < 50 && successRate === 0 && '🤖 Backend sincronizando em background (aguarde 1-2min)'}
            {successRate < 50 && successRate > 0 && '❌ Maioria das boias offline, verificar sistema'}
          </p>
        </div>

        {/* Explicação */}
        <div className="bg-gray-50 border border-gray-200 rounded p-2 mb-3">
          <p className="text-xs text-gray-600">
            ℹ️ Backend sincroniza automaticamente a cada 3 horas. Sistema opera em segundo plano sem impactar performance.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={async () => {
              console.log('🔄 Forçando sincronização manual...');
              try {
                const projectId = 'rqgubpqniscyoojkwltn';
                const publicAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ3VicHFuaXNjeW9vamt3bHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNzQxOTIsImV4cCI6MjA3NTk1MDE5Mn0.hQkPC_Z9RBEwlGHZBpWw6hMIVxfre2UVOKRhVOvsJ9o';
                const url = `https://${projectId}.supabase.co/functions/v1/make-server-2d5da22b/pnboia/sync-all`;
                const response = await fetch(url, {
                  method: 'POST',
                  headers: { 'Authorization': `Bearer ${publicAnonKey}` }
                });
                const data = await response.json();
                console.log('✅ Sincronização manual concluída:', data);
                console.log(`   ${data.summary?.success || 0}/${data.summary?.total || 14} boias sincronizadas`);
                // Não recarregar a página - apenas aguardar próxima verificação automática
              } catch (error) {
                console.error('❌ Erro ao forçar sincronização:', error);
              }
            }}
            className="px-3 py-2 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/90 transition-colors disabled:opacity-50"
            disabled={status.isLoading}
          >
            {status.isLoading ? 'Aguarde...' : '🔄 Sincronizar'}
          </button>
          <button
            onClick={() => setIsExpanded(false)}
            className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors"
          >
            Fechar
          </button>
        </div>

        {/* Debug info */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <button
            onClick={() => console.log('PNBOIA Status:', status)}
            className="w-full text-xs text-gray-500 hover:text-gray-700 text-left"
          >
            🔍 Ver detalhes no console
          </button>
        </div>
      </div>
    </div>
  );
}
