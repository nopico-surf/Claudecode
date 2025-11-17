import { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { saveObservation, getAllObservations } from '../../services/observationsApi';
import { toast } from 'sonner';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * COMPONENTE DE RECUPERAÇÃO - OBSERVAÇÕES DO MORRO DAS PEDRAS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Este componente recupera automaticamente as 2 observações perdidas:
 * 1. 10/11/2025 07:30 - Previsto 1.2m, Real 1.5m (SUBESTIMOU -20%)
 * 2. 11/11/2025 06:15 - Previsto 0.9m, Real 0.8m (Precisão boa +12.5%)
 */

export function RecuperarObservacoesMorro() {
  const [status, setStatus] = useState<'idle' | 'checking' | 'recovering' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [needsRecovery, setNeedsRecovery] = useState(false);
  
  // Verificar se precisa recuperar
  const checkNeedsRecovery = async () => {
    try {
      setStatus('checking');
      setMessage('Verificando observações...');
      
      const observations = await getAllObservations();
      
      // Verificar se já tem as observações do Morro das Pedras
      const morroObs = observations.filter(o => o.spotId === 'sc-floripa-morropedras-1');
      
      if (morroObs.length >= 2) {
        setStatus('success');
        setMessage('✅ Observações do Morro das Pedras já estão salvas!');
        setNeedsRecovery(false);
        return false;
      }
      
      setNeedsRecovery(true);
      setStatus('idle');
      setMessage('⚠️ Observações do Morro das Pedras precisam ser recuperadas');
      return true;
      
    } catch (error) {
      console.error('Erro ao verificar:', error);
      setStatus('error');
      setMessage('Erro ao verificar observações');
      return false;
    }
  };
  
  // Recuperar observações
  const recuperarObservacoes = async () => {
    try {
      setStatus('recovering');
      setMessage('Recuperando observações...');
      
      // ═══════════════════════════════════════════════════════════════════════════
      // OBSERVAÇÃO 1: MORRO DAS PEDRAS (10/11/2025 07:30)
      // ═══════════════════════════════════════════════════════════════════════════
      
      const obs1 = {
        id: 'obs-recuperado-morro-1-' + Date.now(),
        spotId: 'sc-floripa-morropedras-1',
        spotName: 'Morro das Pedras',
        timestamp: new Date('2025-11-10T07:30:00').toISOString(),
        
        offshore: {
          height: 1.43,
          period: 8,
          direction: 150,
          directionLabel: 'SSE'
        },
        
        buoy: {
          height: 1.36,
          period: 8,
          direction: 150,
          buoyId: 'FPOLIS',
          correctionApplied: true
        },
        
        forecast: {
          height: 1.2,
          multiplier: 0.84,
          source: 'forecast-calibrated'
        },
        
        observed: {
          height: 1.5,
          quality: 4,
          conditions: 'good'
        },
        
        context: {
          tide: 'mid' as const,
          wind: 'NE 10kt',
          sessionTime: '07:30'
        },
        
        error: -20.00,
        errorAbsolute: -0.30,
        
        notes: '✅ RECUPERADO - Morro das Pedras 1.5m (10/11/2025) - Previsto 1.2m (SUBESTIMOU -20%)'
      };
      
      // ═══════════════════════════════════════════════════════════════════════════
      // OBSERVAÇÃO 2: MORRO DAS PEDRAS (11/11/2025 06:15)
      // ═══════════════════════════════════════════════════════════════════════════
      
      const obs2 = {
        id: 'obs-recuperado-morro-2-' + Date.now() + 1,
        spotId: 'sc-floripa-morropedras-1',
        spotName: 'Morro das Pedras',
        timestamp: new Date('2025-11-11T06:15:00').toISOString(),
        
        offshore: {
          height: 1.07,
          period: 8,
          direction: 155,
          directionLabel: 'SSE'
        },
        
        buoy: {
          height: 1.02,
          period: 8,
          direction: 155,
          buoyId: 'FPOLIS',
          correctionApplied: true
        },
        
        forecast: {
          height: 0.9,
          multiplier: 0.84,
          source: 'forecast-calibrated'
        },
        
        observed: {
          height: 0.8,
          quality: 3,
          conditions: 'ok'
        },
        
        context: {
          tide: 'low' as const,
          wind: 'E 8kt',
          sessionTime: '06:15'
        },
        
        error: 12.50,
        errorAbsolute: 0.10,
        
        notes: '✅ RECUPERADO - Morro das Pedras 0.8m (11/11/2025 6h15) - Formação regular, séries demoradas'
      };
      
      // Salvar observação 1
      console.log('📝 Salvando observação 1...');
      await saveObservation(obs1 as any);
      setMessage('✅ Observação 1 salva! (10/11/2025 07:30)');
      
      // Aguardar 500ms
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Salvar observação 2
      console.log('📝 Salvando observação 2...');
      await saveObservation(obs2 as any);
      setMessage('✅ Observação 2 salva! (11/11/2025 06:15)');
      
      // Sucesso!
      setStatus('success');
      setMessage('🎉 2 observações do Morro das Pedras recuperadas!');
      setNeedsRecovery(false);
      
      toast.success('🎉 Observações recuperadas!', {
        description: '2 observações do Morro das Pedras adicionadas com sucesso',
        duration: 5000,
      });
      
      // Recarregar a página após 2 segundos
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error('❌ Erro ao recuperar:', error);
      setStatus('error');
      setMessage('❌ Erro ao recuperar observações: ' + (error as Error).message);
      
      toast.error('Erro ao recuperar observações', {
        description: 'Tente novamente ou adicione manualmente',
      });
    }
  };
  
  // Verificar automaticamente quando carregar
  useEffect(() => {
    checkNeedsRecovery();
  }, []);
  
  // Se não precisa recuperar, não mostrar nada
  if (!needsRecovery && status !== 'checking') {
    return null;
  }
  
  return (
    <Card className="p-6 mb-6 bg-gradient-to-r from-orange-50 to-red-50 border-orange-300">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {status === 'checking' && <RefreshCw className="w-8 h-8 text-orange-600 animate-spin" />}
          {status === 'recovering' && <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />}
          {status === 'success' && <CheckCircle className="w-8 h-8 text-green-600" />}
          {status === 'error' && <AlertCircle className="w-8 h-8 text-red-600" />}
          {status === 'idle' && <AlertCircle className="w-8 h-8 text-orange-600" />}
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-2">
            {status === 'idle' && '🔄 Recuperar Observações do Morro das Pedras'}
            {status === 'checking' && '🔍 Verificando observações...'}
            {status === 'recovering' && '📝 Recuperando observações...'}
            {status === 'success' && '✅ Observações recuperadas!'}
            {status === 'error' && '❌ Erro na recuperação'}
          </h3>
          
          <p className="text-sm text-gray-600 mb-4">
            {message}
          </p>
          
          {status === 'idle' && needsRecovery && (
            <>
              <div className="bg-white rounded-lg p-3 mb-4 border border-orange-200">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Você perdeu 2 observações importantes:</strong>
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• <strong>10/11/2025 07:30:</strong> Previsto 1.2m → Real 1.5m (erro -20%)</li>
                  <li>• <strong>11/11/2025 06:15:</strong> Previsto 0.9m → Real 0.8m (erro +12.5%)</li>
                </ul>
              </div>
              
              <Button 
                onClick={recuperarObservacoes}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Recuperar Observações Agora
              </Button>
            </>
          )}
          
          {status === 'success' && (
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <p className="text-sm text-green-700">
                ✅ Total de observações: 5 (Novo Campeche: 2, Morro das Pedras: 2, Lomba: 1)
              </p>
              <p className="text-xs text-green-600 mt-1">
                Recarregando página em 2 segundos...
              </p>
            </div>
          )}
          
          {status === 'error' && (
            <Button 
              onClick={recuperarObservacoes}
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar Novamente
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
