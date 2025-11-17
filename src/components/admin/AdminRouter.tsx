import { useState, useEffect } from 'react';
import { AdminLogin } from './AdminLogin';
import { CalibrationDashboard } from './CalibrationDashboard';
import { ObservationsPage } from './ObservationsPage';
import { PatternsPage } from './PatternsPage';
import { SpotCalibrationDetail } from './SpotCalibrationDetail';
import { PNBOIADashboard } from './PNBOIADashboard';
import { AnalyticsPage } from './AnalyticsPage';
import { CalibrationAnalysisPage } from './CalibrationAnalysisPage';
import { SystemLogsPage } from './SystemLogsPage';
import { StatisticalAnalysisPage } from './StatisticalAnalysisPage';
import { APIComparisonPage } from './APIComparisonPage';

export function AdminRouter() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica se já está autenticado (sessionStorage)
    const isAuth = sessionStorage.getItem('nopico_admin_auth') === 'true';
    setAuthenticated(isAuth);
    setLoading(false);
  }, []);

  const handleAuthenticated = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('nopico_admin_auth');
    setAuthenticated(false);
    window.location.href = '/admin';
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - show login
  if (!authenticated) {
    return <AdminLogin onAuthenticated={handleAuthenticated} />;
  }

  // Authenticated - show admin pages
  const currentPath = window.location.pathname;

  // Dashboard principal
  if (currentPath === '/admin' || currentPath === '/admin/') {
    return <CalibrationDashboard />;
  }

  // Observações
  if (currentPath === '/admin/observations') {
    return <ObservationsPage />;
  }

  // Padrões
  if (currentPath === '/admin/patterns') {
    return <PatternsPage />;
  }

  // Boias PNBOIA
  if (currentPath === '/admin/pnboia') {
    return <PNBOIADashboard />;
  }

  // Analytics
  if (currentPath === '/admin/analytics') {
    return <AnalyticsPage />;
  }

  // Análise de Calibração
  if (currentPath === '/admin/analysis') {
    return <CalibrationAnalysisPage />;
  }

  // System Logs (NOVO)
  if (currentPath === '/admin/logs') {
    return <SystemLogsPage />;
  }

  // Statistical Analysis (NOVO)
  if (currentPath === '/admin/statistics') {
    return <StatisticalAnalysisPage />;
  }

  // API Comparison (NOVO)
  if (currentPath === '/admin/api-comparison') {
    return <APIComparisonPage />;
  }

  // Detalhe de pico (futuro - quando implementar)
  // if (currentPath.startsWith('/admin/spot/')) {
  //   const spotId = currentPath.split('/')[3];
  //   return <SpotCalibrationDetail spotId={spotId} />;
  // }

  // Default: Dashboard
  return <CalibrationDashboard />;
}
