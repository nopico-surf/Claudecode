import { ReactNode } from 'react';
import { Waves, Home, Settings, BarChart3, FileText, LogOut, Anchor, TrendingUp, Calculator, ScrollText, PieChart, GitCompare } from 'lucide-react';
import { Toaster } from '../ui/sonner';

interface AdminLayoutProps {
  children: ReactNode;
  currentPage?: 'dashboard' | 'observations' | 'patterns' | 'pnboia' | 'analytics' | 'analysis' | 'logs' | 'statistics' | 'api-comparison';
}

export function AdminLayout({ children, currentPage = 'dashboard' }: AdminLayoutProps) {
  const navigate = (path: string) => {
    window.location.href = path;
  };
  
  const handleLogout = () => {
    if (confirm('Deseja sair do admin?')) {
      sessionStorage.removeItem('nopico_admin_auth');
      window.location.href = '/admin';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Waves className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Nopico Admin</h1>
                <p className="text-xs text-gray-500">Sistema de Calibração</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                Voltar ao Site
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Sair do admin"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => navigate('/admin')}
              className={`py-4 px-1 border-b-2 text-sm transition-colors ${
                currentPage === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </div>
            </button>
            
            <button
              onClick={() => navigate('/admin/observations')}
              className={`py-4 px-1 border-b-2 text-sm transition-colors ${
                currentPage === 'observations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Observações
              </div>
            </button>
            
            <button
              onClick={() => navigate('/admin/patterns')}
              className={`py-4 px-1 border-b-2 text-sm transition-colors ${
                currentPage === 'patterns'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Padrões
              </div>
            </button>
            
            <button
              onClick={() => navigate('/admin/pnboia')}
              className={`py-4 px-1 border-b-2 text-sm transition-colors ${
                currentPage === 'pnboia'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Anchor className="w-4 h-4" />
                Boias PNBOIA
              </div>
            </button>
            
            <button
              onClick={() => navigate('/admin/analytics')}
              className={`py-4 px-1 border-b-2 text-sm transition-colors ${
                currentPage === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Analytics
              </div>
            </button>
            
            <button
              onClick={() => navigate('/admin/analysis')}
              className={`py-4 px-1 border-b-2 text-sm transition-colors ${
                currentPage === 'analysis'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Análise
              </div>
            </button>
            
            <button
              onClick={() => navigate('/admin/logs')}
              className={`py-4 px-1 border-b-2 text-sm transition-colors ${
                currentPage === 'logs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <ScrollText className="w-4 h-4" />
                System Logs
              </div>
            </button>
            
            <button
              onClick={() => navigate('/admin/statistics')}
              className={`py-4 px-1 border-b-2 text-sm transition-colors ${
                currentPage === 'statistics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4" />
                Estatísticas
              </div>
            </button>
            
            <button
              onClick={() => navigate('/admin/api-comparison')}
              className={`py-4 px-1 border-b-2 text-sm transition-colors ${
                currentPage === 'api-comparison'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <GitCompare className="w-4 h-4" />
                Comparação APIs
              </div>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            Nopico Admin v1.0 - Sistema de Calibração de Ondas
          </p>
        </div>
      </footer>
      
      {/* Toaster para notificações */}
      <Toaster position="top-right" richColors />
    </div>
  );
}
