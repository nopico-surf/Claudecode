import { useState } from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Alert } from '../ui/alert';
import { Waves, Lock, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onAuthenticated: () => void;
}

// Senha do admin (em produção, isso deveria vir de variável de ambiente)
const ADMIN_PASSWORD = 'Limao@32949';

export function AdminLogin({ onAuthenticated }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simula delay de autenticação (segurança básica)
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        // Salva sessão autenticada
        sessionStorage.setItem('nopico_admin_auth', 'true');
        localStorage.setItem('nopico_admin_last_login', new Date().toISOString());
        onAuthenticated();
      } else {
        setError('Senha incorreta. Tente novamente.');
        setPassword('');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Waves className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Nopico Admin</h1>
          <p className="text-sm text-gray-500 mt-2">Sistema de Calibração</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Senha de Acesso
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha..."
              className="mt-2"
              autoFocus
              disabled={loading}
            />
          </div>

          {error && (
            <Alert variant="destructive" className="py-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm">{error}</p>
              </div>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !password}
          >
            {loading ? 'Autenticando...' : 'Acessar Admin'}
          </Button>
        </form>

        {/* Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            🔒 Área restrita - Acesso apenas para administradores
          </p>
        </div>

        {/* Voltar */}
        <div className="mt-4 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 underline font-medium"
          >
            ← Voltar para o site
          </a>
        </div>
      </Card>
    </div>
  );
}
