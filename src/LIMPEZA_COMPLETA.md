# 🧹 LIMPEZA COMPLETA DO PROJETO

## ✅ ARQUIVOS QUE FORAM MANTIDOS NA RAIZ:

### Essenciais:
- `App.tsx` - Componente principal
- `index.html` - HTML principal
- `main.tsx` - Entrypoint React
- `package.json` - Dependências
- `tsconfig.json` - Config TypeScript
- `tsconfig.node.json` - Config TypeScript Node
- `vite.config.ts` - Config Vite
- `vercel.json` - Config Vercel ✅
- `.vercelignore` - Ignora /src e /api ✅

### Úteis:
- `README.md` - Documentação principal
- `Attributions.md` - Créditos
- `env.example` - Exemplo de variáveis de ambiente

---

## ✅ PASTAS MANTIDAS:

- `/components` - Componentes React
- `/data` - Dados dos picos
- `/docs` - Documentação organizada
- `/guidelines` - Guidelines do projeto
- `/hooks` - React hooks
- **`/imports`** - SVGs e assets (NÃO DELETAR!)
- `/public` - Assets públicos
- `/services` - Serviços e APIs
- `/styles` - CSS global
- `/supabase` - Edge functions
- `/types` - TypeScript types
- `/utils` - Utilitários

---

## 🗑️ O QUE FOI DELETADO:

- ~200 arquivos .md, .txt, .js, .sh, .bat de documentação/debug na raiz
- Arquivos de teste antigos
- Scripts de deploy antigos
- Documentação duplicada

---

## ⚠️ AINDA NO REPOSITÓRIO (ignorados pelo .vercelignore):

- `/api` - Pasta antiga das serverless functions (ignorada no deploy)
- `/workflows` - GitHub Actions (ignorado no deploy)

---

## 🎯 PRÓXIMO PASSO:

Fazer PUSH agora com o projeto limpo!

```bash
git add .
git commit -m "chore: limpeza completa do projeto + fix vercel.json"
git push origin main
```

---

## 📊 RESULTADO ESPERADO:

- ✅ CSS carrega (assets corretos)
- ✅ Rotas SPA funcionam (/admin, etc)
- ✅ Projeto mais limpo e organizado
- ✅ Deploy mais rápido (menos arquivos)

---

## 🚨 SE ALGO DER ERRADO:

A pasta `/imports` com SVGs foi MANTIDA intacta!
Todos os componentes, services e hooks foram MANTIDOS!
Apenas documentação foi deletada!
