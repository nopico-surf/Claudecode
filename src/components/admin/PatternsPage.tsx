import { AdminLayout } from './AdminLayout';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Settings, Info, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { getAllPatterns, getCalibratedPatterns } from '../../data/patterns/masterPatterns';

export function PatternsPage() {
  const allPatterns = getAllPatterns();
  const calibratedPatterns = getCalibratedPatterns();
  
  return (
    <AdminLayout currentPage="patterns">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">⚙️ Padrões Master</h1>
            <p className="text-gray-500 mt-1">Padrões calibrados que podem ser aplicados em praias similares</p>
          </div>
        </div>
        
        {/* Info Alert */}
        <Card className="p-4 bg-blue-50 border-blue-200 mb-6">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">Como funcionam os Padrões Master</p>
              <p>
                Padrões são criados a partir de picos calibrados com alta confiança (8+ observações). 
                Eles podem ser aplicados automaticamente a praias similares em todo o Brasil, 
                economizando tempo de calibração.
              </p>
            </div>
          </div>
        </Card>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <p className="text-sm text-gray-500">Total de Padrões</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{allPatterns.length}</p>
            <p className="text-xs text-gray-500 mt-1">Cadastrados no sistema</p>
          </Card>
          
          <Card className="p-6">
            <p className="text-sm text-gray-500">Padrões Calibrados</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{calibratedPatterns.length}</p>
            <p className="text-xs text-gray-500 mt-1">Com confiança média/alta</p>
          </Card>
          
          <Card className="p-6">
            <p className="text-sm text-gray-500">Status</p>
            <Badge variant="outline" className="mt-1">
              <Lock className="w-3 h-3 mr-1" />
              Desativado
            </Badge>
            <p className="text-xs text-gray-500 mt-2">Aplicação automática desligada</p>
          </Card>
        </div>
      </div>
      
      {/* Patterns List */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">📐 Padrões Disponíveis</h2>
        
        <div className="space-y-4">
          {allPatterns.map(pattern => (
            <Card key={pattern.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{pattern.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{pattern.description}</p>
                </div>
                
                <Badge variant={
                  pattern.confidence === 'high' ? 'default' :
                  pattern.confidence === 'medium' ? 'secondary' : 'outline'
                }>
                  {pattern.confidence === 'high' ? '✅ Alta' :
                   pattern.confidence === 'medium' ? '⚠️ Média' : '❌ Baixa'}
                </Badge>
              </div>
              
              {/* Pattern Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Características</p>
                  <div className="space-y-1 text-sm">
                    <div><span className="text-gray-500">Orientação:</span> <span className="font-semibold">{pattern.orientation}</span></div>
                    <div><span className="text-gray-500">Exposição:</span> <span className="font-semibold">{pattern.exposure}</span></div>
                    <div><span className="text-gray-500">Fundo:</span> <span className="font-semibold">{pattern.bottomType}</span></div>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Calibração</p>
                  <div className="space-y-1 text-sm">
                    <div><span className="text-gray-500">Multiplicador base:</span> <span className="font-semibold">{pattern.baseMultiplier}</span></div>
                    <div><span className="text-gray-500">Observações:</span> <span className="font-semibold">{pattern.observations}</span></div>
                    <div><span className="text-gray-500">Erro médio:</span> <span className="font-semibold">{pattern.averageError}%</span></div>
                  </div>
                </div>
              </div>
              
              {/* Direction Adjustments */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 uppercase mb-2">Ajustes por Direção</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {pattern.directionAdjustments.map((adj, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-700">{adj.minDeg}°-{adj.maxDeg}°</span>
                        <span className="text-xs font-bold text-blue-600">×{adj.multiplier}</span>
                      </div>
                      <p className="text-xs text-gray-500">{adj.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Period Sensitivity */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 uppercase mb-2">Sensibilidade ao Período</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-green-50 rounded p-2">
                    <div className="text-green-700 font-semibold">Ideal</div>
                    <div className="text-green-600">{pattern.periodSensitivity.ideal[0]}-{pattern.periodSensitivity.ideal[1]}s</div>
                  </div>
                  <div className="bg-yellow-50 rounded p-2">
                    <div className="text-yellow-700 font-semibold">Bom</div>
                    <div className="text-yellow-600">{pattern.periodSensitivity.good[0]}-{pattern.periodSensitivity.good[1]}s</div>
                  </div>
                  <div className="bg-red-50 rounded p-2">
                    <div className="text-red-700 font-semibold">Ruim</div>
                    <div className="text-red-600">{pattern.periodSensitivity.poor[0]}-{pattern.periodSensitivity.poor[1]}s</div>
                  </div>
                </div>
              </div>
              
              {/* Reference */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs text-gray-500">
                  <span className="font-semibold">Referência:</span> {pattern.reference}
                </p>
                {pattern.appliedTo.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    <span className="font-semibold">Aplicado em:</span> {pattern.appliedTo.length} picos
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* How to Activate */}
      <Card className="p-6 mt-8 bg-yellow-50 border-yellow-200">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-900">
            <p className="font-semibold mb-2">⚠️ Aplicação Automática Desativada</p>
            <p className="mb-2">
              Por segurança, os padrões ainda não são aplicados automaticamente. 
              Primeiro você precisa calibrar picos referência (Floripa) com 8+ observações.
            </p>
            <p className="font-semibold">Para ativar no futuro:</p>
            <ol className="list-decimal list-inside space-y-1 mt-1">
              <li>Calibre 5+ picos de Floripa com confiança alta</li>
              <li>Atualize padrões com dados reais</li>
              <li>Ative flag em <code className="bg-yellow-100 px-1 rounded">adjustmentResolver.ts</code></li>
              <li>Sistema aplicará padrões automaticamente para praias similares</li>
            </ol>
          </div>
        </div>
      </Card>
    </AdminLayout>
  );
}
